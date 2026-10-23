import React from "react";
import logos from "./BrandNames";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const TopBrands = () => {
  return (
    <div className="topBrands">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 5,
          },
          576: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 6,
          },
          992: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {logos.map((logo) => (
          <SwiperSlide key={logo.name}>
            <img src={logo.image} alt={logo.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBrands;
