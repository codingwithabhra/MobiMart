import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import "./Slider.css";

const Slider = () => {
  return (
    <>
      <Swiper
        className="mySwiper"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <Link to={`/products/productdetails/6abe0637f22368e742f835f1`}>
            <img
              src="https://res.cloudinary.com/dajxlecl6/image/upload/v1791551079/iPhone_17_Pro__Bigger_Brighter_Bolder_g5ungp.png"
              alt="iphone 17 pro"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`/products/productdetails/6abe3fead0caabbc8db5bb1b`}>
            <img
              src="https://res.cloudinary.com/dajxlecl6/image/upload/v1791551097/Google_Pixel_10_Pro__Built_for_What_s_Next_yoe2jb.png"
              alt="google pixel 10 pro"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`/products/productdetails/6abe0866f22368e742f83604`}>
            <img
              src="https://res.cloudinary.com/dajxlecl6/image/upload/v1791551118/Vivo_X300_ZEISS_Green_Launch_Banner_dambyn.png"
              alt="vivo x300"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`/products/productdetails/6abe0772f22368e742f835fb`}>
            <img
              src="https://res.cloudinary.com/dajxlecl6/image/upload/v1791551132/Galaxy_S26_Ultra__Built_for_What_s_Next_b23q9h.png"
              alt="galaxy s26 ultra"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
