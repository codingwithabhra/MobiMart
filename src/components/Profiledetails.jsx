import { useCartContext } from "../components/cartContext";
import useFetch from "../components/useFetch";
import { useState } from "react";

const Profile = () => {
  const { user, addresses, addAddress, editAddress, removeAddress } =
    useCartContext();

    console.log("Addresses are -- ", addresses);
    

  const {
    data: orders = [],
    loading,
    error,
  } = useFetch("https://orderhistory-model.vercel.app/orderhistory");

  console.log("orders are -- ", orders);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  if (loading) return <p>Loading the order summary...</p>;
  if (error) return <p>Error loading order summary.</p>;

  return (
    <>
      {/* ================= USER DETAILS ================= */}
      <div className="card p-4 mb-4">
        <div className="text-center">
          <img
            src={user.avatar}
            alt="profile"
            className="rounded-circle mb-3"
            width="90"
          />
          <h3>{user.name}</h3>
          <p className="text-muted">{user.email}</p>
        </div>
      </div>

      {/* ================= ADDRESSES ================= */}
      <div className="card p-4 mb-4">
        <h4 className="mb-3">📍 Saved Addresses</h4>

        {addresses.length === 0 && (
          <p className="text-muted">No addresses added yet.</p>
        )}

        {addresses.map((addr, index) => (
          <div key={addr.id} className="border rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-bold">Address {index + 1}</h6>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setEditId(addr._id);
                    setFormData(addr);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeAddress(addr._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="mb-1">{addr.name}</p>
            <p className="mb-1">{addr.address}</p>
            <p className="mb-0">
              Pincode: {addr.pincode} | 📞 {addr.phone}
            </p>
          </div>
        ))}

        <button
          className="btn btn-outline-primary mt-2"
          onClick={() => {
            setEditId(null);
            setFormData({ name: "", phone: "", address: "", pincode: "" });
            setShowForm(true);
          }}
        >
          + Add New Address
        </button>

        {showForm && (
          <div className="card p-3 mt-3">
            <input
              placeholder="Name"
              className="form-control mb-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              placeholder="Phone"
              className="form-control mb-2"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              placeholder="Address"
              className="form-control mb-2"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <input
              placeholder="Pincode"
              className="form-control mb-2"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
            />

            <button
              className="btn btn-success"
              onClick={() => {
                if (editId) {
                  editAddress(editId, formData);
                } else {
                  addAddress(formData);
                }
                setShowForm(false);
                setEditId(null);
              }}
            >
              {editId ? "Update Address" : "Save Address"}
            </button>
          </div>
        )}
      </div>

      {/* ================= ORDER SUMMARY ================= */}
      <div className="card p-4 my-4">
        <h4 className="mb-3">📦 Order Summary</h4>

        {orders.length === 0 && <p>No orders placed yet.</p>}

        {orders.map((order) => (
          <div key={order._id} className="mb-4">
            {order.products.map((product) => (
              <div
                key={product._id}
                className="d-flex justify-content-between mb-2"
              >
                <div>
                  <h6>{product.productName}</h6>
                  <p className="text-muted mb-0">
                    {product.variant.color}, {product.variant.ram},{" "}
                    {product.variant.storage}
                  </p>
                  <p className="mb-0">Qty: {product.quantity}</p>
                </div>
                <p className="fw-bold">₹{product.price}</p>
              </div>
            ))}

            <hr />

            <p className="fw-semibold">Total: ₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
