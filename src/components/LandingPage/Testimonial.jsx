import React from "react";
import testimonials from "./Testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./Testimonial.css";

const Testimonial = () => {
  return (
    <section className="testimonials-section">
      <div className="container-fluid">
        {/* Section Heading */}
        <div className="testimonial-heading text-center">
          <span className="testimonial-eyebrow">CUSTOMER STORIES</span>

          <h2>
            Loved by Customers, <span>Trusted by Many</span>
          </h2>

          <p>
            Discover what our customers say about their smartphone shopping
            experience with MobiMart.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Swiper
          modules={[Autoplay]}
          className="testimonial-swiper"
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          speed={4500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          allowTouchMove={true}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="testimonial-card">
                {/* Quote Icon */}
                <div className="testimonial-quote">“</div>

                {/* Rating */}
                <div className="testimonial-rating">
                  <div
                    className="testimonial-stars"
                    aria-label={`${item.ratings} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={
                          index + 1 <= item.ratings
                            ? "star-filled"
                            : index < item.ratings
                              ? "star-half"
                              : "star-empty"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="rating-number">
                    {item.ratings.toFixed(1)}/5
                  </span>
                </div>

                {/* Review */}
                <p className="testimonial-text">{item.text}</p>

                {/* Customer Details */}
                <div className="testimonial-customer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="testimonial-image"
                    loading="lazy"
                  />

                  <div className="testimonial-customer-info">
                    <h5>{item.name}</h5>
                    <span className="testimonial-customer-label">
                      MobiMart Customer
                    </span>
                  </div>

                  <div
                    className="testimonial-verified"
                    title="Customer testimonial"
                    aria-label="Customer testimonial"
                  >
                    ✓
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
