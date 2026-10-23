import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

import "swiper/css";
import phoneReviewData from "./phoneReviewData";

const PhoneReviewSlider = () => {
  const swiperRef = useRef(null);

  return (
    <section className="container py-5">
      {/* SECTION HEADER */}
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
        <div>
          <span
            className="badge rounded-pill border mb-2 px-3 py-2"
            style={{ color: "#7c3aed", backgroundColor: "#fff" }}
          >
            EDITORIAL SPOTLIGHT
          </span>

          <h2 className="fw-bold mb-2">Newly Launched Phones</h2>

          <p className="text-secondary mb-0">
            Discover the latest smartphones and editorial picks.
          </p>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "44px", height: "44px" }}
            aria-label="Previous reviews"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaArrowLeft />
          </button>

          <button
            type="button"
            className="btn rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "#7c3aed",
              color: "#fff",
            }}
            aria-label="Next reviews"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* REVIEW SLIDER */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {phoneReviewData.map((review) => (
          <SwiperSlide key={review.id} className="h-auto pb-2">
            <div className="card h-100 border rounded-4 shadow-sm overflow-hidden">
              <div className="card-body d-flex flex-column p-4">
                {/* NEWSPAPER LOGO BOX */}
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 border bg-light mb-3 p-3"
                  style={{ height: "100px" }}
                >
                  <img
                    src={review.newspaperLogo}
                    alt={`${review.newspaperName} logo`}
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "68px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                {/* NEWSPAPER NAME */}
                <p className="small fw-semibold text-secondary mb-3">
                  {review.newspaperName}
                </p>

                {/* PHONE MODEL */}
                <h5 className="fw-bold mb-2">{review.mobileModel}</h5>

                {/* CATEGORY */}
                <p className="small text-secondary mb-3">{review.category}</p>

                {/* REVIEW TEXT */}
                <p className="text-secondary lh-lg mb-4">“{review.review}”</p>

                {/* BOTTOM CONTENT */}
                <div className="mt-auto">
                  {/* SPECIAL REMARK */}
                  <span
                    className="badge rounded-pill border text-white px-3 py-2 mb-3 text-wrap text-start"
                    style={{ backgroundColor: "#7c3aed" }}
                  >
                    {review.specialRemark}
                  </span>

                  {/* RATING */}
                  <div className="d-flex align-items-center gap-2 border-top pt-3">
                    <FaStar className="text-warning" />

                    <span className="fw-bold">{review.rating.toFixed(1)}</span>

                    <span className="small text-secondary">/ 5</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PhoneReviewSlider;
