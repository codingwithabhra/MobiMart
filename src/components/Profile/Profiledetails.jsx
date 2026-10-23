import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiPhone,
  FiMail,
  FiCalendar,
  FiChevronDown,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiXCircle,
  FiLogOut,
} from "react-icons/fi";

import { useCartContext } from "../../contexts/cartContext";
import { BASE_URL } from "../../config/config";

const Profile = () => {
  const navigate = useNavigate();
  const {
    user,
    addresses,
    addAddress,
    editAddress,
    removeAddress,
    userLoading,
    fetchAddresses,
  } = useCartContext();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  // =====================================================
  // LOG OUT FUNCTION
  // =====================================================

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: remove any other auth-related data
    localStorage.removeItem("currentUser");

    // Show confirmation
    toast.success("Logged out successfully");

    // Redirect to login page
    navigate("/");
  };

  // =====================================================
  // FETCH CURRENT USER'S ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setOrdersLoading(false);
        return;
      }

      try {
        setOrdersLoading(true);

        const response = await axios.get(`${BASE_URL}/orderhistory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Orders error:", error);

        setOrdersError(
          error.response?.data?.error ||
            error.response?.data?.message ||
            "Failed to load orders",
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =====================================================
  // ADDRESS FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleAddAddress = () => {
    setEditId(null);

    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setShowForm(true);
  };

  const handleEditAddress = (address) => {
    setEditId(address._id);

    setFormData({
      name: address.name || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
    });

    setShowForm(true);
  };

  const handleSaveAddress = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.pincode
    ) {
      toast.error("Please fill all required address fields");
      return;
    }

    try {
      if (editId) {
        await editAddress(editId, formData);
      } else {
        await addAddress(formData);
      }

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  // =====================================================
  // ORDER STATUS
  // =====================================================

  const getStatusInfo = (status) => {
    switch (status) {
      case "placed":
        return {
          text: "Order Placed",
          className: "bg-primary-subtle text-primary",
          icon: <FiClock size={15} />,
        };

      case "confirmed":
        return {
          text: "Confirmed",
          className: "bg-info-subtle text-info",
          icon: <FiCheckCircle size={15} />,
        };

      case "shipped":
        return {
          text: "Shipped",
          className: "bg-warning-subtle text-warning-emphasis",
          icon: <FiTruck size={15} />,
        };

      case "delivered":
        return {
          text: "Delivered",
          className: "bg-success-subtle text-success",
          icon: <FiCheckCircle size={15} />,
        };

      case "cancelled":
        return {
          text: "Cancelled",
          className: "bg-danger-subtle text-danger",
          icon: <FiXCircle size={15} />,
        };

      default:
        return {
          text: status || "Unknown",
          className: "bg-secondary-subtle text-secondary",
          icon: <FiClock size={15} />,
        };
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // CALCULATE SUMMARY
  // =====================================================

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "delivered",
  ).length;

  const totalSpent = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0,
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (userLoading) {
    return (
      <div className="container-fluid py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="text-muted mt-3 mb-0">Loading your account...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NO USER
  // =====================================================

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <FiUser size={50} className="text-muted mb-3" />

          <h4>You're not logged in</h4>

          <p className="text-muted">Please login to view your account.</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container-fluid">
        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
          <div
            className="p-4 p-md-5"
            style={{
              background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
            }}
          >
            <div className="d-flex flex-column flex-md-row align-items-center gap-4 text-white">
              {/* AVATAR */}

              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center shrink-0"
                style={{
                  width: "100px",
                  height: "100px",
                  overflow: "hidden",
                }}
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name || "Profile"}
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <FiUser size={45} className="text-secondary" />
                )}
              </div>

              {/* USER INFO */}

              <div className="text-center text-md-start grow">
                <p className="mb-1 opacity-75">Welcome back 👋</p>

                <h2 className="fw-bold mb-2">
                  {user.name || "MobiMart Customer"}
                </h2>

                <div className="d-flex flex-column flex-md-row gap-2 gap-md-4 small opacity-90">
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <FiMail />
                    {user.email}
                  </span>

                  {user.phone && (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <FiPhone />
                      {user.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* PROFILE BUTTON */}

              <button
                className="btn btn-light rounded-pill px-4"
                onClick={() => toast.info("Profile editing coming soon")}
              >
                <FiEdit2 className="me-2" />
                Edit Profile
              </button>

              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={handleLogout}
              >
                <FiLogOut className="me-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            ACCOUNT SUMMARY
        ================================================= */}

        <div className="row g-3 mb-4">
          {/* ORDERS */}

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted small mb-1">Total Orders</p>

                    <h3 className="fw-bold mb-0">{totalOrders}</h3>
                  </div>

                  <div className="bg-primary-subtle text-primary rounded-3 p-3">
                    <FiPackage size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DELIVERED */}

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted small mb-1">Delivered Orders</p>

                    <h3 className="fw-bold mb-0">{deliveredOrders}</h3>
                  </div>

                  <div className="bg-success-subtle text-success rounded-3 p-3">
                    <FiCheckCircle size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL SPENT */}

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted small mb-1">Total Spent</p>

                    <h3 className="fw-bold mb-0">
                      ₹{totalSpent.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <div className="bg-warning-subtle text-warning-emphasis rounded-3 p-3">
                    ₹
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            SAVED ADDRESSES
        ================================================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
              <div>
                <h4 className="fw-bold mb-1">
                  <FiMapPin className="me-2" style={{color:"#7c3aed"}}/>
                  Saved Addresses
                </h4>

                <p className="text-muted small mb-0">
                  Manage your delivery addresses
                </p>
              </div>

              <button
                className="btn rounded-pill px-4 text-white"
                onClick={handleAddAddress}
                style={{backgroundColor:"#7c3aed"}}
              >
                <FiPlus className="me-2" />
                Add Address
              </button>
            </div>

            {/* ADDRESS LIST */}

            {addresses.length === 0 ? (
              <div className="text-center py-5 border rounded-4">
                <FiMapPin size={45} className="text-muted mb-3" />

                <h6 className="fw-semibold">No saved addresses</h6>

                <p className="text-muted small mb-3">
                  Add an address to make checkout faster.
                </p>

                <button
                  className="btn btn-outline-primary rounded-pill"
                  onClick={handleAddAddress}
                >
                  <FiPlus className="me-2" />
                  Add Your First Address
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {addresses.map((addr, index) => (
                  <div className="col-12 col-md-4" key={addr._id}>
                    <div className="border rounded-4 p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="text-white rounded-circle p-2" style={{backgroundColor:"#7c3aed", opacity:"0.5"}}>
                            <FiMapPin size={17} />
                          </div>

                          <div>
                            <h6 className="fw-bold mb-0">
                              Address {index + 1}
                            </h6>

                            {index === 0 && (
                              <small className="text-success">
                                Saved address
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="position-relative">
                          <button
                            type="button"
                            className="btn btn-sm btn-light rounded-circle"
                            aria-label="Address options"
                            aria-expanded={openDropdownId === addr._id}
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === addr._id ? null : addr._id,
                              )
                            }
                          >
                            <FiChevronDown />
                          </button>

                          {openDropdownId === addr._id && (
                            <ul
                              className="dropdown-menu show dropdown-menu-end shadow-sm"
                              style={{
                                position: "absolute",
                                top: "100%",
                                right: 0,
                                zIndex: 1050,
                              }}
                            >
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    handleEditAddress(addr);
                                  }}
                                >
                                  <FiEdit2 className="me-2" />
                                  Edit
                                </button>
                              </li>

                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item text-danger"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    removeAddress(addr._id);
                                  }}
                                >
                                  <FiTrash2 className="me-2" />
                                  Delete
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>

                      <h6 className="fw-semibold mb-2">{addr.name}</h6>

                      <p className="text-muted small mb-2">{addr.address}</p>

                      {(addr.city || addr.state) && (
                        <p className="text-muted small mb-2">
                          {addr.city}
                          {addr.city && addr.state ? ", " : ""}
                          {addr.state}
                        </p>
                      )}

                      <div className="d-flex flex-wrap gap-3 small text-muted">
                        <span>
                          <FiPhone className="me-1" />
                          {addr.phone}
                        </span>

                        <span>PIN: {addr.pincode}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* =================================================
                ADDRESS FORM
            ================================================= */}

            {showForm && (
              <div className="border rounded-4 p-4 mt-4 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1">
                      {editId ? "Edit Address" : "Add New Address"}
                    </h5>

                    <p className="text-muted small mb-0">
                      Enter your delivery information
                    </p>
                  </div>

                  <button className="btn-close" onClick={resetForm} />
                </div>

                <div className="row g-3">
                  {/* NAME */}

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* PHONE */}

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* ADDRESS */}

                  <div className="col-12">
                    <label className="form-label small fw-semibold">
                      Address
                    </label>

                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="House no, street, locality..."
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* CITY */}

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">City</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* STATE */}

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">
                      State
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* PINCODE */}

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">
                      Pincode
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button className="btn btn-light px-4" onClick={resetForm}>
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary px-4"
                    onClick={handleSaveAddress}
                  >
                    {editId ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            ORDER HISTORY
        ================================================= */}

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <h4 className="fw-bold mb-1">
                <FiPackage className="me-2" style={{color:"#7c3aed"}} />
                Order History
              </h4>

              <p className="text-muted small mb-0">
                Track and review your previous purchases
              </p>
            </div>

            {/* ORDER LOADING */}

            {ordersLoading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />

                <p className="text-muted small mt-3">Loading your orders...</p>
              </div>
            )}

            {/* ORDER ERROR */}

            {!ordersLoading && ordersError && (
              <div className="alert alert-danger">{ordersError}</div>
            )}

            {/* NO ORDERS */}

            {!ordersLoading && !ordersError && orders.length === 0 && (
              <div className="text-center py-5 border rounded-4">
                <FiPackage size={50} className="text-muted mb-3" />

                <h5 className="fw-semibold">No orders yet</h5>

                <p className="text-muted small mb-0">
                  Your orders will appear here after your first purchase.
                </p>
              </div>
            )}

            {/* ORDERS */}

            {!ordersLoading &&
              !ordersError &&
              orders.map((order) => {
                const status = getStatusInfo(order.orderStatus);

                return (
                  <div
                    key={order._id}
                    className="border rounded-4 mb-4 overflow-hidden"
                  >
                    {/* ORDER HEADER */}

                    <div className="bg-light p-3 p-md-4">
                      <div className="row align-items-center g-3">
                        <div className="col-12 col-md-4">
                          <small className="text-muted d-block">Order ID</small>

                          <span className="fw-semibold small">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </div>

                        <div className="col-6 col-md-3">
                          <small className="text-muted d-block">
                            Order Date
                          </small>

                          <span className="small fw-semibold">
                            <FiCalendar className="me-1" />
                            {formatDate(order.createdAt)}
                          </span>
                        </div>

                        <div className="col-6 col-md-3">
                          <small className="text-muted d-block">Total</small>

                          <span className="fw-bold">
                            ₹
                            {Number(order.totalAmount || 0).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>

                        <div className="col-12 col-md-2">
                          <span
                            className={`badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 `}
                            style={{backgroundColor:"#7c3aed"}}
                          >
                            {status.icon}
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ORDER PRODUCTS */}

                    <div className="p-3 p-md-4">
                      {order.products?.map((product, index) => (
                        <div
                          key={product._id || `${order._id}-${index}`}
                          className="d-flex gap-3 py-3 border-bottom"
                        >
                          {/* PRODUCT IMAGE */}

                          <div
                            className="bg-light rounded-3 d-flex align-items-center justify-content-center shrink-0"
                            style={{
                              width: "80px",
                              height: "80px",
                            }}
                          >
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.productName}
                                className="w-100 h-100 object-fit-contain rounded-3"
                              />
                            ) : (
                              <FiPackage size={28} className="" style={{color:"#7c3aed"}} />
                            )}
                          </div>

                          {/* PRODUCT DETAILS */}

                          <div className="grow">
                            <h6 className="fw-semibold mb-1">
                              {product.productName}
                            </h6>

                            <p className="text-muted small mb-2">
                              {product.variant?.color}
                              {" • "}
                              {product.variant?.ram}
                              {" • "}
                              {product.variant?.storage}
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                              <span className="small text-muted">
                                Qty: <strong>{product.quantity}</strong>
                              </span>

                              <span className="small text-muted">
                                Price:{" "}
                                <strong>
                                  ₹
                                  {Number(product.price || 0).toLocaleString(
                                    "en-IN",
                                  )}
                                </strong>
                              </span>
                            </div>
                          </div>

                          {/* PRICE */}

                          <div className="text-end">
                            <p className="fw-bold mb-0">
                              ₹
                              {(
                                Number(product.price || 0) *
                                Number(product.quantity || 1)
                              ).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* DELIVERY ADDRESS */}

                      {order.selectedAddress && (
                        <div className="bg-light rounded-3 p-3 mt-3">
                          <div className="d-flex gap-2">
                            <FiMapPin className="mt-1 shrink-0" style={{color:"#7c3aed"}} />

                            <div>
                              <p className="small fw-semibold mb-1">
                                Delivery Address
                              </p>

                              <p className="small text-muted mb-0">
                                {order.selectedAddress.name}

                                {" • "}

                                {order.selectedAddress.phone}

                                <br />

                                {order.selectedAddress.addressLine}

                                {order.selectedAddress.city &&
                                  `, ${order.selectedAddress.city}`}

                                {order.selectedAddress.state &&
                                  `, ${order.selectedAddress.state}`}

                                {order.selectedAddress.pincode &&
                                  ` - ${order.selectedAddress.pincode}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
