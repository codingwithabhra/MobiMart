import React from "react";
import Slider from "./Slider";
import "./HomeComponent.css";
import newarrivals from "./NewArrivals";
import logos from "../LandingPage/BrandNames";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/config";
import PhoneReviewSlider from "./PhoneReviewSlider ";

const HomeComponent = () => {
  return (
    <>
      <div className="slider">
        <Slider />
      </div>

      {/* new arrivals */}
      <div className="newArrival-bg">
        <div className="newarrival-content">
          <div className="container-fluid py-4 py-lg-5">
            <h2 className="text-center ctgry-heading fw-semibold shadow-md">
              New Arrivals
            </h2>

            <div className="nwarrivl-display mx-1 mx-md-4 mx-lg-5 mt-4 mt-lg-5">
              <div className="row g-4">
                {newarrivals?.map((product) => (
                  <Link
                    className="col-6 col-md-4 col-lg-3 mb-3"
                    key={product.name}
                    to={`/products/productdetails/${product.id}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid w-100 shadow-md"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* shop by brands */}
      <div className="shopbybrand-bg">
        <div className="shopbybrand-content">
          <div className="container-fluid py-4 py-lg-5">
            <h2 className="text-center ctgry-heading fw-semibold shadow-md">
              Shop By Brands
            </h2>

            <div className="shopbybrand-display mx-1 mx-md-4 mx-lg-5 mt-4 mt-lg-5">
              <div className="row g-4">
                {logos?.map((logo) => (
                  <Link
                    className="col-4 col-md-3 col-lg-2"
                    key={logo.name}
                    to={`/products/brand/${logo.name}`}
                  >
                    <div className="shopbrands-outer">
                      <div className="shopbrands-inner">
                        <img
                          src={logo.image}
                          alt={logo.name}
                          className="img-fluid w-100"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PHONE REVIEW SLIDER */}
      <div className="phoneRevw-bg">
        <PhoneReviewSlider />
      </div>
    </>
  );
};

export default HomeComponent;
