import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/config";
import "./Login_signup.css";

const LoginModal = ({
  onClose,
  initialEmail = "",
  onLoginSuccess,
  onSwitchToSignup,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Update the email when switching from signup to login.
  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Immediately update the user's state in the parent.
      onLoginSuccess(user);

      toast.success(response.data.message || "Login successful!");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to log in. Please try again.",
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
        aria-labelledby="loginTitle"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 px-4 pt-4 pb-0">
              <div>
                <h4 className="modal-title fw-bold" id="loginTitle">
                  Welcome back!
                </h4>
                <p className="text-muted small mb-0 mt-1">
                  Log in to continue shopping with MobiMart.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close login"
              />
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="loginEmail"
                    className="form-label fw-semibold"
                  >
                    Email address
                  </label>
                  <input
                    id="loginEmail"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="loginPassword"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>
                  <input
                    id="loginPassword"
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn fs-5 w-100 auth-primary-btn"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <p className="text-center text-muted mt-4 mb-0">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 fw-semibold auth-link"
                  onClick={onSwitchToSignup}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
