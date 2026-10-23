import { useWishlist } from "../../contexts/wishlistContext";
import { useCartContext } from "../../contexts/cartContext";
import {
  FaRegHeart,
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, Loading, removeFromWishlist } = useWishlist();

  const { addToCart } = useCartContext();

  // =====================================================
  // MOVE ITEM TO CART
  // =====================================================

  const handleMoveToCart = async (item) => {
    if (!item?.product || !item?.variant) {
      return;
    }

    const product = item.product;

    const success = await addToCart({
      productId: product._id,

      variant: {
        color: item.variant.color,
        ram: item.variant.ram,
        storage: item.variant.storage,
      },
    });

    /*
            Remove from wishlist only if the product was
            successfully added to cart.
        */

    if (success !== false) {
      await removeFromWishlist(item._id);
    }
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (Loading) {
    return (
      <div className="container-fluid px-2 px-sm-3 px-lg-5 py-4">
        <div className="mb-4">
          <div className="placeholder-glow">
            <h2 className="placeholder col-6 col-md-3 rounded"></h2>
          </div>

          <div className="placeholder-glow">
            <p className="placeholder col-9 col-md-5 rounded"></p>
          </div>
        </div>

        <div className="row g-3 g-md-4">
          {[1, 2, 3, 4].map((item) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-3">
                <div
                  className="placeholder-glow bg-light rounded-4"
                  style={{ height: "220px" }}
                ></div>

                <div className="card-body px-1">
                  <p className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </p>

                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-7"></span>
                  </p>

                  <p className="placeholder-glow">
                    <span className="placeholder col-5"></span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY WISHLIST
  // =====================================================

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container-fluid px-3 px-md-5 py-5">
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ minHeight: "60vh" }}
        >
          <div
            className="d-flex align-items-center justify-content-center bg-light rounded-circle mb-4"
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            <FaRegHeart size={42} className="text-secondary" />
          </div>

          <h3 className="fw-bold mb-2">Your Wishlist is Empty</h3>

          <p className="text-muted mb-0 px-3">
            Save your favourite smartphones here and come back whenever you're
            ready.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // WISHLIST UI
  // =====================================================

  return (
    <div className="container-fluid px-2 px-sm-3 px-lg-5 py-4 py-md-4">
      {/* =================================================
                HEADER
            ================================================= */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaHeart className="text-danger" size={25} />
            <span>My Wishlist ({wishlist.length})</span>
          </h2>

          <p className="text-muted mb-0 small">
            Your saved smartphones, ready when you are.
          </p>
        </div>
      </div>

      {/* =================================================
                WISHLIST PRODUCTS
            ================================================= */}

      <div className="row g-3 g-md-4">
        {wishlist.map((item) => {
          const product = item.product;

          if (!product || !item.variant) {
            return null;
          }

          // -----------------------------------------
          // Find selected variant
          // -----------------------------------------

          const selectedVariant = product.variants?.find(
            (variant) =>
              variant.color === item.variant.color &&
              variant.ram === item.variant.ram &&
              variant.storage === item.variant.storage,
          );

          // -----------------------------------------
          // Price
          // -----------------------------------------

          const discountedPrice = selectedVariant?.discountedPrice || 0;

          const originalPrice = selectedVariant?.originalPrice || 0;

          // -----------------------------------------
          // Discount percentage
          // -----------------------------------------

          const discount =
            originalPrice > discountedPrice
              ? Math.round(
                  ((originalPrice - discountedPrice) / originalPrice) * 100,
                )
              : 0;

          // -----------------------------------------
          // Image
          // -----------------------------------------

          const image = selectedVariant?.imageUrl || product.imageUrl || "";

          // -----------------------------------------
          // Stock
          // -----------------------------------------

          const stock = selectedVariant?.stock ?? 0;

          return (
            <div key={item._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                {/* =================================
                                    IMAGE SECTION
                                ================================= */}

                <div
                  className="position-relative bg-light d-flex align-items-center justify-content-center"
                  style={{
                    height: "230px",
                  }}
                >
                  {/* Wishlist Icon */}

                  <button
                    type="button"
                    className="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      zIndex: 2,
                    }}
                    onClick={() => removeFromWishlist(item._id)}
                    title="Remove from wishlist"
                  >
                    <FaHeart className="text-danger" size={17} />
                  </button>

                  {/* Product Image */}

                  {image ? (
                    <img
                      src={image}
                      alt={product.smallHeader || product.largeHeader}
                      className="img-fluid"
                      style={{
                        maxHeight: "195px",
                        maxWidth: "85%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <FaRegHeart size={50} className="text-secondary" />
                  )}
                </div>

                {/* =================================
                                    PRODUCT BODY
                                ================================= */}

                <div className="card-body p-3 p-md-4 d-flex flex-column">
                  {/* Brand */}

                  <p className="text-uppercase text-muted small fw-semibold mb-1">
                    {product.brand}
                  </p>

                  {/* Product Name */}

                  <h5 className="fw-bold mb-1 text-truncate">
                    {product.smallHeader}
                  </h5>

                  {/* Product Description */}

                  <p
                    className="text-muted small mb-3"
                    style={{
                      minHeight: "38px",
                    }}
                  >
                    {product.largeHeader}
                  </p>

                  {/* =================================
                                        RATING
                                    ================================= */}

                  {product.modelRating > 0 && (
                    <div className="d-flex align-items-center gap-1 mb-3">
                      <span className="badge bg-success d-flex align-items-center gap-1">
                        {product.modelRating}
                        <FaStar size={10} />
                      </span>

                      <span className="text-muted small">
                        ({product.ratingCount || 0})
                      </span>
                    </div>
                  )}

                  {/* =================================
                                        SELECTED VARIANT
                                    ================================= */}

                  <div className="bg-light rounded-3 p-2 mb-3">
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-white text-dark border">
                        {item.variant.color}
                      </span>

                      <span className="badge bg-white text-dark border">
                        {item.variant.ram}
                      </span>

                      <span className="badge bg-white text-dark border">
                        {item.variant.storage}
                      </span>
                    </div>
                  </div>

                  {/* =================================
                                        PRICE
                                    ================================= */}

                  <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                    <span className="fs-5 fw-bold">
                      ₹{discountedPrice.toLocaleString("en-IN")}
                    </span>

                    {originalPrice > discountedPrice && (
                      <span className="text-muted text-decoration-line-through small">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* =================================
                                        STOCK
                                    ================================= */}

                  <div className="mb-3">
                    {stock > 0 ? (
                      <span
                        className={
                          stock <= 5
                            ? "text-danger small fw-semibold"
                            : "text-success small fw-semibold"
                        }
                      >
                        {stock <= 5 ? `Only ${stock} left` : "In Stock"}
                      </span>
                    ) : (
                      <span className="text-danger small fw-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* =================================
                                        ACTIONS
                                    ================================= */}

                  <div className="mt-auto">
                    {/* MOVE TO CART */}

                    <button
                      type="button"
                      className="btn btn-primary w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-2"
                      disabled={stock <= 0}
                      onClick={() => handleMoveToCart(item)}
                    >
                      <FaShoppingCart size={15} />

                      {stock > 0 ? "Move to Cart" : "Out of Stock"}

                      {stock > 0 && <FaArrowRight size={12} />}
                    </button>

                    {/* REMOVE */}

                    <button
                      type="button"
                      className="btn btn-outline-danger w-100 rounded-3 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      <FaTrash size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
