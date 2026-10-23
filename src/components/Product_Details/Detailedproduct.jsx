import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaTruck } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useWishlist } from "../../contexts/wishlistContext";
import { useCartContext } from "../../contexts/cartContext";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, loading, addToCart } = useCartContext();
  const { addToWishlist } = useWishlist();
  const product = products.find((item) => item._id === productId);
  console.log("From product details page -- ", product);

  //  SELECTED VARIANT
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  /* Whenever a new product is opened, automatically select the FIRST variant. */
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariantId(product.variants[0]._id);
    }
  }, [productId, product]);

  // --------------------------------------- // CURRENT VARIANT // ---------------------------------------
  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;

    return (
      product.variants.find((variant) => variant._id === selectedVariantId) ||
      product.variants[0]
    );
  }, [product, selectedVariantId]);

  // --------------------------------------- // CURRENT VARIANT COLOR// ---------------------------------------
  const getColorName = (color) => {
    if (!color) return "gray";

    return color.trim().split(/\s+/).pop().toLowerCase();
  };

  // --------------------------------------- // DISCOUNT // ---------------------------------------
  const discountPercentage = useMemo(() => {
    if (!selectedVariant?.originalPrice || !selectedVariant?.discountedPrice) {
      return 0;
    }

    return Math.round(
      ((selectedVariant.originalPrice - selectedVariant.discountedPrice) /
        selectedVariant.originalPrice) *
        100,
    );
  }, [selectedVariant]);

  // --------------------------------------- // LOADING // ---------------------------------------
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Loading product...</p>
      </div>
    );
  }

  // --------------------------------------- // PRODUCT NOT FOUND // ---------------------------------------
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
        <p className="text-muted">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // --------------------------------------- // ADD TO CART // ---------------------------------------
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart({
      productId: product._id,
      variant: selectedVariant,
    });
  };

  // --------------------------------------- // ADD TO WISHLIST // ---------------------------------------
  const handleWishlist = () => {
    if (!selectedVariant) return;

    addToWishlist({
      productId: product._id,
      product: product,
      variant: selectedVariant,
    });
  };

  return (
    <div className="product-details-page">
      <div className="container-fluid px-3 px-lg-5 py-4">
        <div className="row g-4 g-lg-5">
          {/* ================================================= LEFT SIDE - PRODUCT IMAGE ================================================= */}
          <div className="col-12 col-lg-5">
            <div className="product-image-section">
              {/* IMAGE CARD */}
              <div className="product-main-image">
                {selectedVariant?.imageUrl ? (
                  <img
                    src={selectedVariant.imageUrl}
                    alt={`${product.largeHeader} - ${selectedVariant.color}`}
                  />
                ) : (
                  <div className="no-product-image"> No Image Available </div>
                )}
                {/* DISCOUNT BADGE */}
                {discountPercentage > 0 && (
                  <span className="discount-badge">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* VARIANT IMAGE SELECTOR */}
              <div className="variant-images">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    className={`variant-image-btn ${selectedVariant?._id === variant._id ? "active" : ""}`}
                    onClick={() => setSelectedVariantId(variant._id)}
                  >
                    {variant.imageUrl ? (
                      <img src={variant.imageUrl} alt={variant.color} />
                    ) : (
                      <span>{variant.color}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* ================================================= RIGHT SIDE - PRODUCT INFORMATION ================================================= */}
          <div className="col-12 col-lg-7">
            <div className="product-info">
              {/* BRAND */}
              <p className="product-brand"> {product.brand} </p>
              {/* PRODUCT TITLE */}
              <h1 className="product-title"> {product.largeHeader} </h1>
              <p className="product-subtitle"> {product.smallHeader} </p>
              {/* RATING */}
              <div className="product-rating-row">
                <div className="rating-box">
                  <span> {product.modelRating} </span>
                  <FaStar />
                </div>

                <span className="rating-count">
                  {" "}
                  {product.ratingCount.toLocaleString()} ratings{" "}
                </span>
                <span className="rating-divider"> | </span>
                <span className="review-count">
                  {" "}
                  {product.reviewsCount.toLocaleString()} reviews{" "}
                </span>
              </div>
              <hr />
              {/* PRICE */}
              <div className="price-section">
                <span className="current-price">
                  {" "}
                  ₹
                  {selectedVariant?.discountedPrice?.toLocaleString(
                    "en-IN",
                  )}{" "}
                </span>
                <span className="original-price">
                  {" "}
                  ₹
                  {selectedVariant?.originalPrice?.toLocaleString("en-IN")}{" "}
                </span>
                {discountPercentage > 0 && (
                  <span className="discount-text">
                    {" "}
                    {discountPercentage}% off{" "}
                  </span>
                )}
              </div>
              {/* OFFER */}
              <div className="offer-box">
                <MdOutlineLocalOffer />
                <div>
                  <strong>Special Offer</strong>
                  <p> Get extra discounts on selected payment methods. </p>
                </div>
              </div>
              {/* ================================================= VARIANT SELECTION ================================================= */}
              <div className="variant-selection">
                <h5> Choose your variant </h5>
                <div className="variant-list">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?._id === variant._id;

                    return (
                      <button
                        key={variant._id}
                        className={`variant-card ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedVariantId(variant._id)}
                      >
                        {/* COLOR */}
                        <div className="variant-color">
                          <span
                            className="color-dot"
                            style={{
                              backgroundColor: getColorName(variant.color),
                            }}
                          />
                          {variant.color}
                        </div>

                        {/* RAM */}
                        <span className="variant-spec"> {variant.ram} </span>

                        {/* STORAGE */}
                        <span className="variant-spec">
                          {" "}
                          {variant.storage}{" "}
                        </span>

                        {/* PRICE */}
                        <strong className="variant-price">
                          {" "}
                          ₹{" "}
                          {variant.discountedPrice.toLocaleString("en-IN")}{" "}
                        </strong>

                        {/* SELECTED */}
                        {isSelected && (
                          <span className="selected-label"> ✓ Selected </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* ================================================= CURRENT SELECTION ================================================= */}
              <div className="selected-details">
                <div>
                  {" "}
                  <span>Color</span>{" "}
                  <strong> {selectedVariant?.color} </strong>{" "}
                </div>
                <div>
                  {" "}
                  <span>RAM</span>{" "}
                  <strong> {selectedVariant?.ram} </strong>{" "}
                </div>
                <div>
                  {" "}
                  <span>Storage</span>{" "}
                  <strong> {selectedVariant?.storage} </strong>{" "}
                </div>{" "}
              </div>
              {/* STOCK */}
              <div className="stock-section">
                {selectedVariant?.stock > 0 ? (
                  <>
                    <span className="stock-dot"></span>
                    <strong> In Stock </strong>
                    <span> ({selectedVariant.stock} available) </span>
                  </>
                ) : (
                  <strong className="out-of-stock"> Out of Stock </strong>
                )}
              </div>
              {/* ACTION BUTTONS */}
              <div className="product-actions">
                <button
                  className="btn-add-cart"
                  disabled={selectedVariant?.stock === 0}
                  onClick={handleAddToCart}
                >
                  {" "}
                  <FaShoppingCart /> Add to Cart{" "}
                </button>
                <button
                  className="btn-buy-now"
                  disabled={!selectedVariant || selectedVariant.stock <= 0}
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        mode: "buyNow",
                        product,
                        variant: selectedVariant,
                      },
                    });
                  }}
                >
                  Buy Now
                </button>
                <button className="btn-wishlist" onClick={handleWishlist}>
                  {" "}
                  <FaHeart />{" "}
                </button>
              </div>
              {/* DELIVERY */}
              <div className="delivery-info">
                <div className="delivery-item">
                  <div>
                    <strong>Free Delivery</strong>
                    <span> Available on this product </span>
                  </div>
                  <FaTruck />
                </div>
                <div className="delivery-item">
                  <span className="return-icon"> ↩ </span>
                  <div>
                    {" "}
                    <strong>7 Days Replacement</strong>{" "}
                    <span> Easy replacement available </span>{" "}
                  </div>
                </div>{" "}
              </div>{" "}
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
