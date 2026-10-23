import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPlus,
  FaShieldAlt,
  FaShoppingBag,
  FaTruck,
  FaTimes,
} from "react-icons/fa";
import { useCartContext } from "../../contexts/cartContext";
import "./Checkout.css";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const Checkedoutproducts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    cartItems = [],
    loading,
    error,
    addresses = [],
    selectAddress,
    selectedAddress,
    addAddress,
    placeOrder,
    orderPlaced,
    setOrderPlaced,
  } = useCartContext();

  const buyNowData = location.state?.mode === "buyNow" ? location.state : null;
  const [showForm, setShowForm] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: ""
  });

  const checkoutItems = useMemo(() => {
    if (buyNowData?.product && buyNowData?.variant) {
      return [
        {
          product: buyNowData.product,
          variant: buyNowData.variant,
          quantity: 1,
          _id: null,
        },
      ];
    }
    return cartItems.map((item) => ({
      ...item,
      product: item.product?._id ? item.product : item,
      quantity: Number(item.quantity ?? item.variant?.quantity ?? 1),
    }));
  }, [buyNowData, cartItems]);

  const subtotal = checkoutItems.reduce((sum, item) => {
    const price = Number(
      item.variant?.discountedPrice ?? item.discountedPrice ?? 0,
    );
    return sum + price * item.quantity;
  }, 0);

  const totalSavings = checkoutItems.reduce((sum, item) => {
    const original = Number(
      item.variant?.originalPrice ?? item.originalPrice ?? 0,
    );
    const discounted = Number(
      item.variant?.discountedPrice ?? item.discountedPrice ?? 0,
    );
    return sum + Math.max(0, original - discounted) * item.quantity;
  }, 0);

  useEffect(() => {
    if (!orderPlaced) return;
    setShowSuccess(true);
    const timer = setTimeout(() => {
      setShowSuccess(false);
      setOrderPlaced(false);
      navigate("/home", { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [orderPlaced, setOrderPlaced, navigate]);

  const handleAddressChange = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setFormError("");
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();
    const { name, phone, address, pincode, city, state } = formData;
    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !pincode.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      setFormError("Please complete every field.");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      setFormError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setFormError("Enter a valid 6-digit PIN code.");
      return;
    }
    await addAddress(formData);
    setFormData({ name: "", phone: "", address: "", pincode: "", city: "", state: "" });
    setShowForm(false);
    setFormError("");
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !checkoutItems.length || placingOrder) return;
    setPlacingOrder(true);
    try {
      const success = await placeOrder({
        items: buyNowData ? checkoutItems : undefined,
        totalAmount: subtotal,
      });
      if (success) setOrderPlaced(true);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading && !buyNowData && !cartItems.length) {
    return (
      <div className="container py-5 text-center checkout-state">
        <div
          className="spinner-border checkout-spinner"
          role="status"
          aria-label="Loading"
        />
        <p className="text-secondary mt-3 mb-0">Preparing your checkout...</p>
      </div>
    );
  }

  if (error && !buyNowData && !cartItems.length) {
    return (
      <div className="container py-5 text-center checkout-state">
        <h3 className="h4">Unable to load checkout</h3>
        <p className="text-secondary">Please refresh the page and try again.</p>
        <button className="btn btn-mobimart" onClick={() => navigate("/home")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (!checkoutItems.length && !showSuccess) {
    return (
      <div className="container py-5 text-center checkout-state">
        <FaShoppingBag className="empty-cart-icon mb-3" />
        <h3 className="h4">Your cart is empty</h3>
        <p className="text-secondary">
          Add some products before proceeding to checkout.
        </p>
        <button className="btn btn-mobimart" onClick={() => navigate("/home")}>
          Explore Smartphones
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page min-vh-100 pb-5 px-2 px-lg-5">
      <div className="container-fluid py-4 py-lg-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="display-6 fw-bold mb-2">
              <span className="me-3">
                <IoShieldCheckmarkOutline size={35} />
              </span>
              <span>Checkout</span>
            </h1>
            <p className="text-secondary mb-0">
              Review your order and confirm your delivery details.
            </p>
          </div>
          <div
            className="checkout-steps d-flex align-items-center align-self-start align-self-md-center"
            aria-label="Checkout progress"
          >
            <span className="step-circle step-done">
              <FaCheckCircle />
            </span>
            <span className="step-line" />
            <span className="step-circle step-current">2</span>
            <span className="step-line" />
            <span className="step-circle step-pending">3</span>
          </div>
        </div>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <section className="card checkout-card mb-4">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span className="section-icon">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h2 className="h5 fw-bold mb-1">Delivery Address</h2>
                    <p className="small text-secondary mb-0">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                {addresses.length ? (
                  <div className="row g-3">
                    {addresses.map((addr, index) => {
                      const addressId = addr._id ?? addr.id;
                      const selectedId =
                        selectedAddress?._id ?? selectedAddress?.id;
                      const isSelected = selectedId === addressId;
                      return (
                        <div
                          className="col-12 col-md-6"
                          key={addressId ?? index}
                        >
                          <label
                            className={`address-option d-flex gap-3 h-100 p-3 rounded-3 ${isSelected ? "address-selected" : ""}`}
                          >
                            <input
                              className="form-check-input mt-1 shrink-0"
                              type="radio"
                              name="deliveryAddress"
                              checked={Boolean(isSelected)}
                              onChange={() => selectAddress(addressId)}
                            />
                            <span className="min-w-0 flex-grow-1">
                              <span className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                <strong>{addr.name}</strong>
                                <span className="badge address-tag">
                                  Address {index + 1}
                                </span>
                              </span>
                              <span className="d-block small text-secondary address-text">
                                {addr.address}
                              </span>
                              <span className="d-block small text-secondary mt-2">
                                {addr.phone} · {addr.pincode}
                              </span>
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-address text-center p-4 rounded-3">
                    <FaMapMarkerAlt className="brand-icon fs-4 mb-2" />
                    <p className="small text-secondary mb-0">
                      You haven't added a delivery address yet.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-link add-address-link px-0 mt-3 text-decoration-none fw-semibold"
                  onClick={() => setShowForm((previous) => !previous)}
                >
                  {showForm ? (
                    <FaTimes className="me-2" />
                  ) : (
                    <FaPlus className="me-2" />
                  )}
                  {showForm ? "Cancel" : "Add a new address"}
                </button>

                {showForm && (
                  <form
                    className="address-form rounded-3 p-3 p-md-4 mt-2"
                    onSubmit={handleSaveAddress}
                  >
                    <h3 className="h6 fw-bold mb-3">New delivery address</h3>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <input
                          className="form-control"
                          value={formData.name}
                          placeholder="Full name"
                          autoComplete="name"
                          onChange={(e) =>
                            handleAddressChange("name", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          className="form-control"
                          value={formData.phone}
                          placeholder="10-digit phone number"
                          inputMode="numeric"
                          maxLength={10}
                          autoComplete="tel"
                          onChange={(e) =>
                            handleAddressChange("phone", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          rows="2"
                          value={formData.address}
                          placeholder="House no., street, locality"
                          autoComplete="street-address"
                          onChange={(e) =>
                            handleAddressChange("address", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          className="form-control"
                          value={formData.pincode}
                          placeholder="6-digit PIN code"
                          inputMode="numeric"
                          maxLength={6}
                          autoComplete="postal-code"
                          onChange={(e) =>
                            handleAddressChange("pincode", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          className="form-control"
                          value={formData.city}
                          placeholder="City"
                          autoComplete="address-level2"
                          onChange={(e) =>
                            handleAddressChange("city", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          className="form-control"
                          value={formData.state}
                          placeholder="State"
                          autoComplete="address-level2"
                          onChange={(e) =>
                            handleAddressChange("state", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    {formError && (
                      <div className="alert alert-danger py-2 small mt-3 mb-0">
                        {formError}
                      </div>
                    )}
                    <button type="submit" className="btn btn-mobimart mt-3">
                      Save Address
                    </button>
                  </form>
                )}
              </div>
            </section>

            <section className="card checkout-card">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex align-items-center gap-3 mb-3 mb-md-4">
                  <span className="section-icon">
                    <FaShoppingBag />
                  </span>
                  <div>
                    <h2 className="h5 fw-bold mb-1">Order Items</h2>
                    <p className="small text-secondary mb-0">
                      {checkoutItems.length} product
                      {checkoutItems.length !== 1 ? "s" : ""} in your order
                    </p>
                  </div>
                </div>
                <div>
                  {checkoutItems.map((item, index) => {
                    const product = item.product;
                    const variant = item.variant || {};
                    const price = Number(
                      variant.discountedPrice ?? item.discountedPrice ?? 0,
                    );
                    const originalPrice = Number(
                      variant.originalPrice ?? item.originalPrice ?? price,
                    );
                    return (
                      <div
                        className="checkout-product d-flex align-items-center gap-3 py-3"
                        key={
                          item._id ||
                          `${product?._id}-${variant.color}-${variant.ram}-${index}`
                        }
                      >
                        <div className="product-image-box flex-shrink-0">
                          {variant.imageUrl ? (
                            <img
                              src={variant.imageUrl}
                              alt={
                                product?.largeHeader ||
                                product?.smallHeader ||
                                "Smartphone"
                              }
                            />
                          ) : (
                            <FaShoppingBag />
                          )}
                        </div>
                        <div className="flex-grow-1 min-w-0">
                          <span className="small text-uppercase text-secondary">
                            {product?.brand}
                          </span>
                          <h3 className="h6 fw-bold my-1 product-name">
                            {product?.largeHeader ||
                              product?.smallHeader ||
                              "Smartphone"}
                          </h3>
                          <p className="small text-secondary mb-1">
                            {[variant.color, variant.ram, variant.storage]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                          <span className="small fw-semibold brand-text">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                        <div className="text-end flex-shrink-0 product-price">
                          <strong className="d-block">
                            {formatPrice(price * item.quantity)}
                          </strong>
                          {originalPrice > price && (
                            <del className="small text-secondary">
                              {formatPrice(originalPrice * item.quantity)}
                            </del>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <aside className="col-12 col-lg-4">
            <div className="card checkout-card checkout-summary">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-4">
                  <h2 className="h5 fw-bold mb-0">Price Details</h2>
                  <span className="small text-secondary">
                    {checkoutItems.length} item
                    {checkoutItems.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="d-flex justify-content-between gap-3 my-3 small">
                  <span className="text-secondary">Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className="d-flex justify-content-between gap-3 my-3 small">
                  <span className="text-secondary">Delivery charges</span>
                  <strong className="text-success">FREE</strong>
                </div>
                {totalSavings > 0 && (
                  <div className="d-flex justify-content-between gap-3 my-3 small">
                    <span className="text-secondary">You save</span>
                    <strong className="text-success">
                      −{formatPrice(totalSavings)}
                    </strong>
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center gap-3 border-top pt-3 mt-4">
                  <span className="fw-semibold">Total payable</span>
                  <strong className="fs-4 brand-text text-end">
                    {formatPrice(subtotal)}
                  </strong>
                </div>
                <p className="small text-secondary mt-2 mb-3">
                  Final amount is based on the prices of your selected variants.
                </p>
                <button
                  type="button"
                  className="btn btn-mobimart w-100 py-3 fw-semibold"
                  onClick={handlePlaceOrder}
                  disabled={
                    !selectedAddress ||
                    !checkoutItems.length ||
                    placingOrder ||
                    showSuccess
                  }
                >
                  {placingOrder ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order <span className="ms-2">→</span>
                    </>
                  )}
                </button>
                {!selectedAddress && (
                  <p className="small text-warning text-center mt-2 mb-0">
                    Select a delivery address to continue.
                  </p>
                )}
                <div className="d-flex align-items-center gap-3 border-top mt-4 pt-3">
                  <FaTruck className="brand-icon fs-5" />
                  <div>
                    <strong className="d-block small">Free Delivery</strong>
                    <span className="small text-secondary">
                      On your smartphone order
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <FaShieldAlt className="brand-icon fs-5" />
                  <div>
                    <strong className="d-block small">Safe &amp; Secure</strong>
                    <span className="small text-secondary">
                      Your order is processed securely
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showSuccess && (
        <div className="order-success-overlay" role="presentation">
          <div
            className="order-success-modal bg-white rounded-4 shadow-lg text-center p-4 p-sm-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
          >
            <button
              type="button"
              className="success-close btn btn-light rounded-circle"
              aria-label="Close confirmation"
              onClick={() => {
                setShowSuccess(false);
                setOrderPlaced(false);
                navigate("/home", { replace: true });
              }}
            >
              <FaTimes />
            </button>
            <div className="success-icon mx-auto mb-3">
              <FaCheckCircle />
            </div>
            <p className="checkout-eyebrow mb-2">ORDER CONFIRMED</p>
            <h2 id="order-success-title" className="h3 fw-bold mb-3">
              Order placed!
            </h2>
            <p className="text-secondary">
              Thank you for shopping with{" "}
              <strong className="brand-text">MobiMart</strong>. Your order has
              been placed successfully.
            </p>
            <div className="success-delivery-note d-flex align-items-center justify-content-center gap-2 rounded-3 p-3 mt-4">
              <FaTruck />
              <span>Thank you for choosing us. Happy shopping!</span>
            </div>
            <p className="small text-secondary mt-3 mb-0">
              Taking you back to the home page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkedoutproducts;
