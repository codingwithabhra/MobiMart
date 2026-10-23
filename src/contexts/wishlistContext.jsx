import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config/config";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [Loading, setLoading] = useState(false);

  // GET AUTH CONFIG
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // FETCH WISHLIST
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Don't request wishlist if user is not logged in
      if (!token) {
        setWishlist([]);
        return;
      }

      const response = await axios.get(`${BASE_URL}/wishlist`, getAuthConfig());

      // console.log("Wishlist API response:", response.data);

      const items = Array.isArray(response.data?.items)
        ? response.data.items
        : [];

      setWishlist(items);
    } catch (error) {
      console.error(
        "Error fetching wishlist:",
        error.response?.data || error.message,
      );

      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // FETCH WISHLIST WHEN PROVIDER LOADS
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    fetchWishlist();
  }, []);

  // REFETCH WISHLIST
  const refetchWishlist = async () => {
    await fetchWishlist();
  };

  // CHECK IF PRODUCT VARIANT IS IN WISHLIST
  const isInWishlist = (productId, variant) => {
    if (!productId || !variant) {
      return false;
    }

    return wishlist.some((item) => {
      const itemProductId =
        typeof item.product === "object" ? item.product?._id : item.product;

      return (
        itemProductId === productId &&
        item.variant?.color === variant.color &&
        item.variant?.ram === variant.ram &&
        item.variant?.storage === variant.storage
      );
    });
  };

  // ADD TO WISHLIST --------------------------------------------------------------------
  const addToWishlist = async ({
    productId,
    product = null,
    title = "",
    image = "",
    price = 0,
    variant,
  }) => {
    // VALIDATE LOGIN
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add products to wishlist");
      return false;
    }

    // VALIDATE VARIANT
    if (!variant?.color || !variant?.ram || !variant?.storage) {
      toast.dark("Please select color, RAM and storage");
      return false;
    }

    // CHECK DUPLICATE
    const alreadyExists = isInWishlist(productId, variant);

    if (alreadyExists) {
      toast.dark("This product variant is already in your wishlist");
      return false;
    }

    // SAVE CURRENT STATE
    const previousWishlist = wishlist;

    // CREATE OPTIMISTIC PRODUCT
    const optimisticProduct = product || {
      _id: productId,
      largeHeader: title,
      smallHeader: title,
      variants: [
        {
          ...variant,
          imageUrl: image,
          discountedPrice: price,
        },
      ],
    };

    // CREATE OPTIMISTIC WISHLIST ITEM
    const optimisticItem = {
      _id: `temp-${Date.now()}`,

      product: optimisticProduct,

      variant: {
        color: variant.color,
        ram: variant.ram,
        storage: variant.storage,
      },
    };

    // IMMEDIATE UI UPDATE
    setWishlist((prev) => [...prev, optimisticItem]);

    try {
      // SEND REQUEST TO BACKEND
      const response = await axios.post(
        `${BASE_URL}/wishlist`,
        {
          productId,

          variant: {
            color: variant.color,
            ram: variant.ram,
            storage: variant.storage,
          },
        },
        getAuthConfig(),
      );

      console.log("Product added to wishlist:", response.data);

      // SUCCESS
      if (response.status === 201) {
        toast.success("Added to wishlist ❤️");
        await fetchWishlist();
        return true;
      }

      // UNEXPECTED RESPONSE
      setWishlist(previousWishlist);

      return false;
    } catch (error) {
      console.error(
        "Add to wishlist error:",
        error.response?.data || error.message,
      );

      // ROLLBACK OPTIMISTIC UPDATE
      setWishlist(previousWishlist);

      // DUPLICATE
      if (error.response?.status === 409) {
        toast.dark("This product variant is already in your wishlist");
        return false;
      }

      // UNAUTHORIZED
      if (error.response?.status === 401) {
        toast.error("Please login to add products to wishlist");
        return false;
      }

      // OTHER ERROR
      toast.error(
        error.response?.data?.error ||
          "Something went wrong while adding to wishlist",
      );
      return false;
    }
  };

  // REMOVE FROM WISHLIST ------------------------------------------------------
  const removeFromWishlist = async (itemId) => {
    // FIND ITEM
    const itemToRemove = wishlist.find((item) => item._id === itemId);

    if (!itemToRemove) {
      return false;
    }

    // SAVE OLD STATE
    const previousWishlist = wishlist;

    // IMMEDIATE UI UPDATE
    setWishlist((prev) => prev.filter((item) => item._id !== itemId));

    try {
      // DELETE FROM BACKEND
      const response = await axios.delete(
        `${BASE_URL}/wishlist/item/${itemId}`,
        getAuthConfig(),
      );

      console.log("Wishlist item removed:", response.data);

      // SUCCESS
      if (response.status === 200) {
        toast.success("Removed from wishlist ❌");

        return true;
      }

      // UNEXPECTED RESPONSE
      setWishlist(previousWishlist);

      return false;
    } catch (error) {
      console.error(
        "Remove wishlist item error:",
        error.response?.data || error.message,
      );

      // ROLLBACK
      setWishlist(previousWishlist);

      // UNAUTHORIZED

      if (error.response?.status === 401) {
        toast.error("Please login to remove wishlist items");
        return false;
      }

      // WISHLIST NOT FOUND

      if (error.response?.status === 404) {
        toast.error("Wishlist not found");

        return false;
      }

      // OTHER ERROR
      toast.error(
        error.response?.data?.error ||
          "Something went wrong while removing wishlist item",
      );
      return false;
    }
  };

  // CLEAR WISHLIST --------------------------------------------------------
  const clearWishlist = () => {
    setWishlist([]);
  };

  // GET WISHLIST ITEM FOR PRODUCT + VARIANT ---------------------------------
  const getWishlistItem = (productId, variant) => {
    if (!productId || !variant) {
      return null;
    }

    return (
      wishlist.find((item) => {
        const itemProductId =
          typeof item.product === "object" ? item.product?._id : item.product;

        return (
          itemProductId === productId &&
          item.variant?.color === variant.color &&
          item.variant?.ram === variant.ram &&
          item.variant?.storage === variant.storage
        );
      }) || null
    );
  };

  // TOTAL WISHLIST COUNT
  const wishlistCount = wishlist.length;

  // CONTEXT PROVIDER
  return (
    <WishlistContext.Provider
      value={{
        // Wishlist data
        wishlist,
        wishlistCount,
        Loading,
        setWishlist,
        setLoading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistItem,
        refetchWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
