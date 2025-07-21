import React, { useRef, useContext, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../context/ShopContext";
import "./AutoPlaySlider.css";

const Skeleton = () => (
  <div className="skeleton-loader" />
);

const AutoPlaySlider = () => {
  const sliderRef = useRef();
  const { slides } = useContext(ShopContext);

  const [loadedMap, setLoadedMap] = useState({});

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

  useEffect(() => {
    if (slides) {
      const initialState = {};
      slides.forEach((s) => {
        initialState[s._id] = false;
      });
      setLoadedMap(initialState);
    }
  }, [slides]);

  const handleLoad = (id) => {
    setTimeout(() => {
      setLoadedMap((prev) => ({ ...prev, [id]: true }));
    }, 1500); // Minimum skeleton time
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides && slides.length > 0 ? (
          slides.map((slide) => {
            const mediaUrl = slide?.image?.[0];
            const isLoaded = loadedMap[slide._id];

            if (!mediaUrl) {
              return (
                <div key={slide._id} className="skeleton-loader">
                  <p>Media Missing</p>
                </div>
              );
            }

            let ext = "";
            try {
              ext = new URL(mediaUrl).pathname.split(".").pop()?.toLowerCase();
            } catch (e) {
              return (
                <div key={slide._id} className="skeleton-loader">
                  <p>Invalid Media URL</p>
                </div>
              );
            }

            return (
              <div key={slide._id}>
                {!isLoaded && <Skeleton />}
                {["mp4", "webm"].includes(ext) ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => handleLoad(slide._id)}
                    className={`media-slide ${isLoaded ? "" : "hidden"}`}
                    aria-label="Video Slide"
                  />
                ) : ["jpg", "jpeg", "png", "gif", "webp"].includes(ext) ? (
                  <img
                    src={mediaUrl}
                    alt="Slide"
                    loading="lazy"
                    onLoad={() => handleLoad(slide._id)}
                    className={`media-slide ${isLoaded ? "" : "hidden"}`}
                  />
                ) : (
                  <div className="skeleton-loader">
                    <p>Unsupported Media Type</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="skeleton-loader">
            <p>No Slides Available</p>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default AutoPlaySlider;
