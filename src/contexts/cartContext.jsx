import { createContext, useContext, useState, useEffect } from "react";
// import useFetch from "../components/useFetch";
import { toast } from "react-toastify";
import { useWishlist } from "./wishlistContext";
import { BASE_URL } from "../config/config";
import axios from "axios";

const cartContext = createContext();
export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const { addToWishlist, refetchWishlist } = useWishlist();

  //for fetching all product data
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  //for fetching user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("Logged-in user:", response.data);

        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.error(
          "Profile fetch error:",
          error.response?.data?.message || error.message,
        );

        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // For fetching cart items
  const fetchCart = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Cart API response:", response.data);

      const items = response.data.items || [];

      // Find the complete variant details for every cart item
      const updatedCartItems = items.map((item) => {
        const selectedVariant = item.product?.variants?.find(
          (variant) =>
            variant.color === item.variant.color &&
            variant.ram === item.variant.ram &&
            variant.storage === item.variant.storage,
        );

        return {
          ...item,

          // Keep the selected cart variant
          variant: {
            ...item.variant,

            // Add variant-specific details
            imageUrl: selectedVariant?.imageUrl || "",
            originalPrice: selectedVariant?.originalPrice || 0,
            discountedPrice: selectedVariant?.discountedPrice || 0,
            stock: selectedVariant?.stock || 0,
          },
        };
      });

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);

      setError(error.response?.data?.message || "Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // FETCH SAVED ADDRESSES
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAddresses([]);
        return;
      }

      const response = await axios.get(`${BASE_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedAddresses = Array.isArray(response.data) ? response.data : [];

      setAddresses(savedAddresses);

      return savedAddresses;
    } catch (error) {
      console.error(
        "Fetch addresses error:",
        error.response?.data?.message || error.message,
      );

      setAddresses([]);

      toast.error(
        error.response?.data?.message || "Failed to fetch saved addresses",
      );
    }
  };

  useEffect(() => {
    if (!userLoading && user) {
      fetchAddresses();
    }
  }, [userLoading, user]);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const increaseQty = (cartId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === cartId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQty = (cartId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === cartId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    );
  };

  const isProductAlreadyInCart = (productId, variant) => {
    return cartItems.some((item) => {
      const itemProductId =
        typeof item.product === "object" ? item.product._id : item.product;

      return (
        itemProductId === productId &&
        item.variant.color === variant.color &&
        item.variant.ram === variant.ram &&
        item.variant.storage === variant.storage
      );
    });
  };

  // for adding to cart ----------------------------------------------------
  const addToCart = async ({ productId, variant }) => {
    if (!variant?.color || !variant?.ram || !variant?.storage) {
      toast.dark("Please select color, RAM and storage");
      return;
    }

    const alreadyExists = isProductAlreadyInCart(productId, variant);

    if (alreadyExists) {
      toast.dark("This product is already added in cart");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/cart`,
        {
          productId,
          variant: {
            color: variant.color,
            ram: variant.ram,
            storage: variant.storage,
            quantity: 1,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;

      toast.success("Added to cart ❤️");

      // Update cart state using response
      await fetchCart();

      console.log("Product added to cart:", data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // for removing from cart ----------------------------------------------------
  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/cart/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Immediately update cart state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId),
      );

      toast.success("Removed from cart ❌");
    } catch (error) {
      console.error(
        "Remove from cart error:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // MOVING ITEM FROM CART TO WISHLIST
  const moveToWishlist = async ({
    cartId,
    productId,
    title,
    image,
    price,
    variant,
  }) => {
    await addToWishlist({ productId, title, image, price, variant });
    refetchWishlist();
    removeFromCart(cartId);
  };

  // ADD NEW ADDRESS
  const addAddress = async (newAddress) => {
    console.log("From cart context, New address -- ", newAddress);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${BASE_URL}/address`, newAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("From cart context, data --", response.data);

      toast.success("Address added successfully");

      // Fetch updated addresses
      const addressResponse = await axios.get(`${BASE_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses(
        Array.isArray(addressResponse.data) ? addressResponse.data : [],
      );
    } catch (error) {
      console.error(
        "Add address error:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Failed to add address");
    }
  };

  // UPDATE ADDRESS (DB + UI)
  const editAddress = async (id, updatedAddress) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/address/${id}`,
        updatedAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Updated response after edit -- ", response.data);

      toast.success("Address updated");

      // Fetch updated addresses
      const addressResponse = await axios.get(`${BASE_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses(
        Array.isArray(addressResponse.data) ? addressResponse.data : [],
      );
    } catch (error) {
      console.error(
        "Update address error:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Failed to update address");
    }
  };

  // DELETE ADDRESS (DB + UI)
  const removeAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Address deleted");

      // Update UI immediately
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error(
        "Delete address error:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const selectedAddress = addresses.find(
    (addr) => addr._id === selectedAddressId,
  );

  // Add order history to ORDER DB
  const placeOrder = async ({ items, totalAmount } = {}) => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return false;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in before placing your order");
      return false;
    }

    const orderItems = items || cartItems;

    if (!orderItems.length) {
      toast.error("Your cart is empty");
      return false;
    }

    const productsForOrder = orderItems.map((item) => {
      const product = item.product?._id ? item.product : item;
      const variant = item.variant || {};

      return {
        productId: product._id || item.productId,
        productName: product.smallHeader || product.largeHeader || "Smartphone",
        quantity: Number(item.quantity ?? variant.quantity ?? 1),
        price: Number(variant.discountedPrice ?? item.discountedPrice ?? 0),
        variant: {
          color: variant.color,
          ram: variant.ram,
          storage: variant.storage,
        },
      };
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/orderhistory`,
        {
          products: productsForOrder,
          totalAmount:
            totalAmount ??
            productsForOrder.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            ),
          selectedAddress: {
            name: selectedAddress.name,
            phone: selectedAddress.phone,
            addressLine: selectedAddress.address,
            pincode: selectedAddress.pincode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Order saved:", response.data);

      // Clear the purchased items only after the order is saved.
      // This assumes the backend supports DELETE /cart/item/:itemId.
      if (!items) {
        await Promise.all(
          cartItems.map((item) =>
            axios.delete(`${BASE_URL}/cart/item/${item._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ),
        );

        setCartItems([]);
      }

      setOrderPlaced(true);
      return true;
    } catch (error) {
      console.error(
        "Place order error:",
        error.response?.data || error.message,
      );

      toast.error(
        error.response?.data?.message || "Unable to place your order",
      );

      return false;
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        products,
        loading,
        error,
        increaseQty,
        decreaseQty,
        addToCart,
        removeFromCart,
        moveToWishlist,
        addresses,
        selectedAddress,
        selectAddress,
        addAddress,
        editAddress,
        removeAddress,
        fetchAddresses,
        placeOrder,
        orderPlaced,
        setOrderPlaced,
        user,
        setUser,
        userLoading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
