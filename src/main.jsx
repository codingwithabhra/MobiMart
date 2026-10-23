import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import { CartProvider } from "./contexts/cartContext.jsx";
import { WishlistProvider } from "./contexts/wishlistContext.jsx";
import Profile from "./pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import { FilterProvider } from "./contexts/filterContext.jsx";
import Home from "./pages/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/products/productdetails/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/products/brand/:brandName",
    element: <ProductListing />,
  },
  {
    path: "/products/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/products/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <WishlistProvider>
        <CartProvider>
          <FilterProvider>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </FilterProvider>
        </CartProvider>
      </WishlistProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
