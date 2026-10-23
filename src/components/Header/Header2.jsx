import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { TbMenu2 } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { IoPencilSharp } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { BASE_URL } from "../../config/config";
import SignupModal from "../Auth/SignupModal";
import LoginModal from "../Auth/LoginModal";
import "./Header.css";
import { useCartContext } from "../../contexts/cartContext";

const Header2 = () => {
  const navigate = useNavigate();
  const { user, setUser } = useCartContext();

  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [signupEmail, setSignupEmail] = useState("");

  const openSignup = () => {
    setIsOpen(false);
    setActiveModal("signup");
  };

  const openLogin = () => {
    setIsOpen(false);
    setSignupEmail("");
    setActiveModal("login");
  };

  // Signup success: close signup and open login.
  const handleSignupSuccess = (email) => {
    setSignupEmail(email);
    setActiveModal("login");
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setActiveModal(null);
    setIsOpen(false);
    navigate("/home");
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/google`, {
        id_token: credentialResponse.credential,
      });

      const { token, user: loggedInUser } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Immediately update the shared user state.
      setUser(loggedInUser);

      setActiveModal(null);
      setIsOpen(false);

      toast.success("Google login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed.");
    }
  };

  const renderAuthActions = () => (
    <>
      <button type="button" className="signup" onClick={openSignup}>
        <span>Sign Up</span>
        <span className="ms-1">
          <IoPencilSharp />
        </span>
      </button>

      <button type="button" className="login" onClick={openLogin}>
        <span>Log in</span>
        <span className="ms-1">
          <BiLogIn size={25} />
        </span>
      </button>

      <div className="googleLogin">
        <GoogleLogin
          theme="outline"
          shape="rectangular"
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed.")}
        />
      </div>
    </>
  );

  return (
    <>
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#7c3aed" }}
      >
        <div className="container-fluid px-3">
          <div className="navbar-top w-100 d-flex align-items-center justify-content-between">
            {/* LOGO */}
            <div className="left">
              <Link
                className="navbar-brand d-flex align-items-center m-0"
                to="/"
              >
                <img
                  src="/logo.png"
                  alt="MobiMart"
                  className="img-fluid"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              </Link>
            </div>

            {/* DESKTOP AUTH ACTIONS */}
            <div className="right desktop-right gap-lg-5">
              {renderAuthActions()}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="btn p-0 border-0 bg-transparent d-lg-none me-3 text-white"
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <IoMdCloseCircle size={33} /> : <TbMenu2 size={33} />}
            </button>
          </div>

          {/* MOBILE / TABLET AUTH ACTIONS */}
          <div className={`slide-navbar ${isOpen ? "open" : ""}`}>
            <div className="mobile-auth-actions">{renderAuthActions()}</div>
          </div>
        </div>
      </nav>

      {/* AUTH MODALS */}
      {activeModal === "signup" && (
        <SignupModal
          onClose={() => setActiveModal(null)}
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={openLogin}
        />
      )}

      {activeModal === "login" && (
        <LoginModal
          initialEmail={signupEmail}
          onClose={() => setActiveModal(null)}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={openSignup}
        />
      )}
    </>
  );
};

export default Header2;
