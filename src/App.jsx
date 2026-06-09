import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import useFetch from "./components/useFetch";
import { Link } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { data, loading, error } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );
  console.log(data);

  const newArrivedProducts = data?.filter((event) => event.newArrival == true);
  // console.log(newArrivedProducts);

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        
        <Slider />

        { loading && <p>Product List is loading ...</p>}
        { error && <p>Error loading products</p>}
        <h2 className="text-center mt-5 fw-bold">New Arrivals</h2>

        <div className="container mb-5">
          <div className="row">
            
            {newArrivedProducts?.map((product) => (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-3 mt-4"
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/products/productdetails/${product._id}`}
                >
                  <div
                    className="card h-100 shadow bg-primary text-white"
                    style={{ border: "none" }}
                  >
                    <div className="row g-0">
                      <div className="col-3">
                        <img
                          src={product.imageUrl}
                          className="img-fluid rounded"
                          alt={product.smallHeader}
                          style={{ height: "100px" }}
                        />
                      </div>
                      <div className="col-9">
                        <div className="card-body">
                          <h5 className="card-title fw-bold fs-4">
                            {product.smallHeader}
                          </h5>
                          <p className="card-text fs-4">
                            ₹{product.discountedPrice}{" "}
                            <span className="fw-normal fs-6 text-decoration-line-through">
                              ₹{product.originalPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <h2 className="text-center mt-5 fw-bold">Select Category</h2>

        <div className="category mt-5 mb-5">
          <div className="container">
            <div className="row g-4 justify-content-center align-items-center">
              {/* APPLE CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Apple"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://images.macrumors.com/t/myq0N5iVZ0Q9DG_s0E_XejgPgdY=/1600x/article-new/2025/09/iphone-17-pro-orange.jpg"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Apple Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* REALME CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Realme"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://static2.realme.net/images/realme-13-pro-plus/color/0a.jpg"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Realme Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* SAMSUNG CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Samsung"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://androidcommunity.com/wp-content/uploads/2020/09/Samsung-Smartphone-Concept-Transparent-Display.jpg"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Samsung Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* MOTOROLLA CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Motorola"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://motorolanews.com/wp-content/uploads/2025/11/Moto-g_Blog-image_4.jpg"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Motorolla Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* PIXEL CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Google"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://media.wired.com/photos/68a7a913ababd253d6b1768f/4:3/w_5000,h_3750,c_limit/Google%20Pixel%2010%20Series%20SOURCE%20Julian%20Chokkattu.jpgp"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Google pixel Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* VIVO CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Vivo"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://i.ytimg.com/vi/nTd8t6dVmbU/maxresdefault.jpg"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Vivo Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* OPPO CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link
                  className="subCategory text-decoration-none"
                  to={"/products/brand/Oppo"}
                >
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://i.cdn.newsbytesapp.com/images/l48420230710131411.png"
                        className="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Oppo Phones</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
