import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";
import { BsCart3, BsShieldCheck, BsTrash3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    isLoading,
    isError,
    cartItems,
    moveToWishlist,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCartContext();

  const navigate = useNavigate();

  console.log("From cart page --", cartItems);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.variant.discountedPrice * item.quantity;
  }, 0);

  const totalSavings = cartItems.reduce((total, item) => {
    return (
      total +
      (item.variant.originalPrice - item.variant.discountedPrice) *
        item.quantity
    );
  }, 0);

  console.log("From cart page --", totalPrice);

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3 mb-0">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          Unable to load your cart. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-1 mx-lg-5 py-4 py-md-4">
      {/* ================= HEADER ================= */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <BsCart3 size={32} />
            My Cart
          </h2>

          <p className="text-muted mb-0">
            Review your selected products before checkout
          </p>
        </div>
      </div>

      {/* ================= EMPTY CART ================= */}
      {cartItems.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body text-center py-5 px-3">
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "90px",
                height: "90px",
              }}
            >
              <BsCart3 size={42} className="text-secondary" />
            </div>

            <h3 className="fw-bold">Your cart is empty</h3>

            <p className="text-muted mb-4">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link to="/home" className="btn btn-dark px-4 py-2 rounded-pill">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* ================= CART PRODUCTS ================= */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Cart Items</h5>

                  <span className="text-muted small">
                    {cartItems.length} product
                    {cartItems.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* PRODUCTS */}
                <div className="d-flex flex-column gap-3">
                  {cartItems.map((product) => (
                    <div
                      key={product.cartId || product._id}
                      className="border rounded-4 p-3"
                    >
                      <div className="row g-3 align-items-center">
                        {/* ================= IMAGE ================= */}
                        <div className="col-12 col-sm-4 col-md-3">
                          <div
                            className="bg-light rounded-4 d-flex align-items-center justify-content-center p-3"
                            style={{
                              minHeight: "190px",
                            }}
                          >
                            <img
                              src={product.variant?.imageUrl}
                              className="img-fluid"
                              alt={product.product.smallHeader}
                              style={{
                                maxHeight: "170px",
                                width: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </div>

                        {/* ================= PRODUCT DETAILS ================= */}
                        <div className="col-12 col-sm-8 col-md-9">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <h5 className="fw-bold mb-1">
                                {product.product.smallHeader}
                              </h5>

                              <p className="text-muted small mb-2">
                                {product.product.brand}
                              </p>
                            </div>

                            {/* REMOVE ICON */}
                            <button
                              type="button"
                              onClick={() => removeFromCart(product._id)}
                              className="btn btn-sm btn-light text-danger rounded-circle"
                              title="Remove"
                            >
                              <BsTrash3 size={16} />
                            </button>
                          </div>

                          {/* RATINGS */}
                          <div className="small text-muted mb-3">
                            ⭐ {product.product.modelRating || 0}{" "}
                            <span className="ms-1">
                              ({product.product.ratingCount || 0} ratings)
                            </span>
                          </div>

                          {/* VARIANTS */}
                          <div className="d-flex flex-wrap gap-2 mb-3">
                            <span className="badge bg-light text-dark border fw-normal px-3 py-2">
                              Color: <strong>{product.variant.color}</strong>
                            </span>

                            <span className="badge bg-light text-dark border fw-normal px-3 py-2">
                              RAM: <strong>{product.variant.ram}</strong>
                            </span>

                            <span className="badge bg-light text-dark border fw-normal px-3 py-2">
                              Storage:{" "}
                              <strong>{product.variant.storage}</strong>
                            </span>
                          </div>

                          {/* PRICE + QUANTITY */}
                          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
                            {/* PRICE */}
                            <div>
                              <div className="d-flex align-items-center flex-wrap gap-2">
                                <span className="fw-bold fs-4">
                                  ₹
                                  {Number(
                                    product.variant.discountedPrice || 0,
                                  ).toLocaleString("en-IN")}
                                </span>

                                {product.variant.originalPrice &&
                                  product.variant.originalPrice >
                                    product.variant.discountedPrice && (
                                    <span className="text-muted text-decoration-line-through small">
                                      ₹
                                      {Number(
                                        product.variant.originalPrice,
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  )}
                              </div>

                              {product.variant.originalPrice &&
                                product.variant.originalPrice >
                                  product.variant.discountedPrice && (
                                  <small className="text-success fw-semibold">
                                    Save ₹
                                    {(
                                      product.variant.originalPrice -
                                      product.variant.discountedPrice
                                    ).toLocaleString("en-IN")}
                                  </small>
                                )}
                            </div>

                            {/* QUANTITY */}
                            <div>
                              <small className="text-muted d-block mb-1">
                                Quantity
                              </small>

                              <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                                <button
                                  type="button"
                                  className="btn btn-light border-0 px-3"
                                  onClick={() => decreaseQty(product._id)}
                                  disabled={product.quantity <= 1}
                                >
                                  −
                                </button>

                                <span className="px-3 fw-bold">
                                  {product.quantity}
                                </span>

                                <button
                                  type="button"
                                  className="btn btn-light border-0 px-3"
                                  onClick={() => increaseQty(product._id)}
                                  disabled={
                                    product.quantity >= product.variant.stock
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary rounded-pill px-3"
                              onClick={() =>
                                moveToWishlist({
                                  cartId: product._id,
                                  productId: product.product._id,
                                  title: product.smallHeader,
                                  image: product.variant?.imageUrl,
                                  price: product.variant?.discountedPrice,
                                  variant: {
                                    color: product.variant.color,
                                    ram: product.variant.ram,
                                    storage: product.variant.storage,
                                  },
                                })
                              }
                            >
                              <FiHeart className="me-1" />
                              Move to Wishlist
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger rounded-pill px-3 d-none d-sm-inline-block"
                              onClick={() => removeFromCart(product._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ITEM TOTAL */}
                      <div className="border-top mt-3 pt-3 d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Item Total</span>

                        <strong className="fs-5">
                          ₹
                          {(
                            Number(product.variant.discountedPrice || 0) *
                            Number(product.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 position-lg-sticky top-0">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Order Summary</h5>

                {/* TOTAL PRODUCTS */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Total items</span>

                  <span className="fw-semibold">{cartItems.length}</span>
                </div>

                {/* CART PRODUCTS TOTAL */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Total Price</span>

                  <span className="fw-semibold">
                    ₹{Number(totalPrice).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* SAVINGS */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Total savings</span>

                  <span className="text-success fw-semibold">
                    - ₹{Number(totalSavings).toLocaleString("en-IN")}
                  </span>
                </div>

                <hr />

                {/* FINAL TOTAL */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1">Final Amount</h5>

                    <small className="text-muted">
                      Inclusive of selected products
                    </small>
                  </div>

                  <h4 className="fw-bold mb-0">
                    ₹{Number(totalPrice).toLocaleString("en-IN")}
                  </h4>
                </div>

                {/* CHECKOUT BUTTON */}
                <button
                  className="btn d-block m-auto w-100 text-white"
                  onClick={() => navigate("/checkout")}
                  disabled={!cartItems.length}
                  style={{backgroundColor:"#7c3aed"}}
                >
                  Proceed to Checkout
                </button>

                {/* SECURITY INFO */}
                <div className="d-flex align-items-start gap-2 mt-4 text-muted">
                  <BsShieldCheck size={22} className="shrink-0" />

                  <small>
                    Your cart and checkout information are securely protected.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOTTOM TRUST MESSAGE ================= */}
      {cartItems.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-light rounded-4 p-3 p-md-4">
              <div className="row text-center g-3">
                <div className="col-12 col-md-4">
                  <BsShieldCheck size={25} className="mb-2" />
                  <p className="fw-semibold mb-0">Secure Checkout</p>
                  <small className="text-muted">Safe and secure payments</small>
                </div>

                <div className="col-12 col-md-4">
                  <BsCart3 size={25} className="mb-2" />
                  <p className="fw-semibold mb-0">Easy Shopping</p>
                  <small className="text-muted">
                    Simple and convenient checkout
                  </small>
                </div>

                <div className="col-12 col-md-4">
                  <FiHeart size={25} className="mb-2" />
                  <p className="fw-semibold mb-0">Save for Later</p>
                  <small className="text-muted">
                    Move products to your wishlist
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
