import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "./cartContext";
import { toast } from "react-toastify";
import "./slide-navbar.css";
import { useWishlist } from "./wishlistContext";

const Header = () => {
  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  const { user, cartlist } = useCartContext();

  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        "https://smartphone-app.vercel.app/products",
      );
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

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#0171be" }}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/MobiMart.png"
              alt="MobiMart"
              className="img-fluid"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse slide-navbar ${isOpen ? "open" : ""}`}
            id="navbarSupportedContent"
          >
            {/* SEARCH */}
            <form
              className="d-flex my-3 my-lg-0 mx-lg-auto"
              onSubmit={handleSearch}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by model name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {/* LOGIN/CART */}
            <div className="rightPart ms-lg-auto d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
              <Link
                className="btn d-flex align-items-center"
                style={{ color: "#fff", padding: "0" }}
                to="/profile"
              >
                <img
                  src={user.avatar}
                  alt="user"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
                <span className="d-none d-lg-inline p-2">{user.name}</span>
              </Link>

              {/* WISHLIST */}
              <Link to="/products/wishlist" className="position-relative">
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
              <Link to="/products/cart" className="position-relative">
                <i
                  className="fa-solid fa-cart-shopping fs-5"
                  style={{ color: "#fff" }}
                ></i>

                {cartlist?.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {cartlist.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
