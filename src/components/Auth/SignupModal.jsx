import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";
import "./Login_signup.css";

const SignupModal = ({ onClose, onSignupSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      toast.success(response.data.message || "Account created successfully!");

      // Open login modal after successful registration.
      onSignupSuccess(formData.email.trim().toLowerCase());
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signupTitle"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 px-4 pt-4 pb-0">
              <div>
                <h4 className="modal-title fw-bold" id="signupTitle">
                  Create an account
                </h4>
                <p className="text-muted small mb-0 mt-1">
                  Join MobiMart and explore your next smartphone.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close signup"
              />
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="signupName"
                    className="form-label fw-semibold"
                  >
                    Full name
                  </label>
                  <input
                    id="signupName"
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="signupEmail"
                    className="form-label fw-semibold"
                  >
                    Email address
                  </label>
                  <input
                    id="signupEmail"
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="signupPassword"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn fs-5 w-100 auth-primary-btn"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Submit"}
                </button>
              </form>

              <p className="text-center text-muted mt-4 mb-0">
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 fw-semibold auth-link"
                  onClick={onSwitchToLogin}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
