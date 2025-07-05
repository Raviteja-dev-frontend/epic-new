import React, { useRef, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../context/ShopContext";

const AutoPlaySlider = () => {
  const sliderRef = useRef();
  const { slides } = useContext(ShopContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container w-full max-h-[600px] overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {slides && slides.length > 0 ? (
          slides.map((slide) => {
            const mediaUrl = slide?.image?.[0];

            if (!mediaUrl) {
              return (
                <div
                  key={slide._id}
                  className="w-full h-64 bg-gray-300 flex justify-center items-center"
                >
                  <p className="text-center">Media Missing</p>
                </div>
              );
            }

            let ext = "";
            try {
              ext = new URL(mediaUrl).pathname.split(".").pop()?.toLowerCase();
            } catch (e) {
              console.warn("Invalid media URL:", mediaUrl);
              return (
                <div
                  key={slide._id}
                  className="w-full h-64 bg-gray-300 flex justify-center items-center"
                >
                  <p className="text-center">Invalid Media URL</p>
                </div>
              );
            }

            return (
              <div key={slide._id} className="slide-item w-full">
                {["mp4", "webm"].includes(ext) ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[600px] object-cover"
                    aria-label="Video Slide"
                  />
                ) : ["jpg", "jpeg", "png", "gif", "webp"].includes(ext) ? (
                  <img
                    src={mediaUrl}
                    alt="Slide"
                    className="w-full max-h-[600px] object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-300 flex justify-center items-center">
                    <p className="text-center">Unsupported Media Type</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="w-full h-64 bg-gray-300 flex justify-center items-center">
            <p className="text-center">No Slides Available</p>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default AutoPlaySlider;
