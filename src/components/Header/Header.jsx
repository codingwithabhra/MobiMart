import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../../contexts/cartContext";
import { toast } from "react-toastify";
// import "./slide-navbar.css";
import { useWishlist } from "../../contexts/wishlistContext";
import "./Header.css";
import { TbMenu2 } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BASE_URL } from "../../config/config";
import { BsPersonCircle } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  const { user, userLoading, cartItems } = useCartContext();

  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/products`);
      const products = await response.json();

      const matchedProduct = products.find((product) =>
        product.smallHeader.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (!matchedProduct) {
        toast.error("❌ No product found");
        return;
      }

      // redirecting without useNavigate
      navigate(`/products/productdetails/${matchedProduct._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while searching");
    }
  };

  // console.log("User from header -- ", user);

  return (
    <>
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#7c3aed" }}
      >
        <div className="container-fluid px-3">
          {/* ================= TOP ROW ================= */}
          <div className="navbar-top w-100 d-flex align-items-center justify-content-between">
            {/* LOGO */}
            <div className="left">
              <Link
                className="navbar-brand d-flex align-items-center m-0"
                to="/home"
              >
                <img
                  src="/logo.png"
                  alt="MobiMart"
                  className="img-fluid"
                  style={{
                    maxWidth: "150px",
                    height: "auto",
                  }}
                />
              </Link>
            </div>

            {/* DESKTOP RIGHT SECTION */}
            <div className="right desktop-right gap-lg-5">
              {/* SEARCH */}
              <form
                className="search-form d-flex me-lg-5"
                onSubmit={handleSearch}
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search by model name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>

              {/* ACTIONS */}
              <div className="nav-actions d-flex align-items-center gap-3">
                {/* WISHLIST */}
                <Link
                  to="/products/wishlist"
                  className="position-relative text-decoration-none me-lg-2"
                >
                  <FaHeart size={22} />

                  {wishlist?.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {/* CART */}
                <Link
                  to="/products/cart"
                  className="position-relative text-decoration-none me-lg-5"
                >
                  <FaCartShopping size={22} />

                  {cartItems?.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* PROFILE */}
                {!userLoading && user ? (
                  <Link
                    to="/profile"
                    className="d-flex align-items-center text-decoration-none btn btn-light rounded-pill"
                  >
                    <span className="me-2 d-flex align-items-center justify-content-center">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="User profile"
                          className="rounded-circle"
                          width="26"
                          height="26"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <BsPersonCircle size={26} className="text-secondary" />
                      )}
                    </span>

                    <span className="fw-semibold text-dark">
                      {user.name?.split(" ")[0] || "My Account"}
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-light rounded-pill"
                    onClick={() => navigate("/")}
                  >
                    <BsPersonCircle size={26} />
                    <span className="ms-2">My Account</span>
                  </button>
                )}
              </div>
            </div>

            {/* HAMBURGER - ONLY < 992px */}
            <button
              className="btn p-0 border-0 bg-transparent d-lg-none me-3 text-white"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <IoMdCloseCircle size={33} /> : <TbMenu2 size={33} />}
            </button>
          </div>

          {/* ================= MOBILE / TABLET SLIDING SECTION ================= */}

          <div className={`slide-navbar ${isOpen ? "open" : ""}`}>
            {/* SEARCH */}
            <form className="search-form mobile-search" onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Search by model name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {/* ACTIONS */}
            <div className="nav-actions mobile-actions d-flex align-items-center justify-content-center gap-4">
              {/* WISHLIST */}
              <Link
                to="/products/wishlist"
                className="position-relative text-decoration-none"
                onClick={() => setIsOpen(false)}
              >
                <i
                  className="fa-solid fa-heart fs-5"
                  style={{ color: "#fff" }}
                ></i>

                {wishlist?.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* CART */}
              <Link
                to="/products/cart"
                className="position-relative text-decoration-none"
                onClick={() => setIsOpen(false)}
              >
                <i
                  className="fa-solid fa-cart-shopping fs-5"
                  style={{ color: "#fff" }}
                ></i>

                {cartItems?.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* PROFILE */}
              {!userLoading && user ? (
                <Link
                  to="/profile"
                  className="d-flex align-items-center text-decoration-none btn btn-light rounded-pill"
                >
                  <span className="me-2 d-flex align-items-center justify-content-center">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="User profile"
                        className="rounded-circle"
                        width="26"
                        height="26"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <BsPersonCircle size={20} className="text-secondary" />
                    )}
                  </span>

                  <span className="fw-regular text-dark">
                    {user.name?.split(" ")[0] || "My Account"}
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn btn-light rounded-pill"
                  onClick={() => navigate("/")}
                >
                  <BsPersonCircle size={26} />
                  <span className="ms-2">My Account</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
