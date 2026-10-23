import React from "react";
import AdBanner from "./AdBanner";
import TopBrands from "./TopBrands";
import "./Landingpage.css";
import Testimonial from "./Testimonial";
import "./Testimonial.css"

const Landingcomponent = () => {
  return (
    <div>
      <AdBanner />

      {/* TOP BRANDS */}
      <div className="brandNames">
        <div className="container-fluid">
          <div className="heading testimonial-heading text-center">
            <span className="testimonial-eyebrow">EXPLORE OUR COLLECTION</span>

            <h2>
              Top <span>Brands</span>
            </h2>
          </div>
          <TopBrands />
        </div>
      </div>

      {/* DISCOUNT AD */}
      <div className="discount">
        <div className="dscnt-img">
          <img
            src="https://res.cloudinary.com/dajxlecl6/image/upload/v1791807409/Unbelievable_Smartphone_Discounts_et3ktk.png"
            alt="Discount_image"
            className="img-fluid"
          />
        </div>
      </div>

      {/* TESTIMONIALS */}
      <Testimonial />
    </div>
  );
};

export default Landingcomponent;
