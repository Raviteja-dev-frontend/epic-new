

import React, { useContext } from "react";
import Slider from "react-slick";
import { ShopContext } from "../context/ShopContext";
import "./SimpleSlider.css";

export default function SimpleSlider() {
  const { products } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

const baseSettings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: Math.min(products.length, 4), // Default desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0, // scrolls continuously
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1281, // large laptops
      settings: {
        slidesToShow: Math.min(products.length, 3),
      },
    },
    {
      breakpoint: 1024, // tablets
      settings: {
        slidesToShow: Math.min(products.length, 3),
      },
    },
    {
      breakpoint: 768, // mobile landscape
      settings: {
        slidesToShow: Math.min(products.length, 2),
      },
    },
    {
      breakpoint: 480, // mobile portrait
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

  const forwardSettings = {
    ...baseSettings,
    rtl: false,
  };

  const reverseSettings = {
    ...baseSettings,
    rtl: true, // scrolls in reverse direction
  };

  return (
    <div className="ProductSnick space-y-8">
      {/* Forward Slider */}
      <div className="slider-container">
        <Slider {...forwardSettings}>
          {products.map((product) => {
            const firstImage = Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : "";
            return (
              <div key={product._id} className="slide-card">
                {firstImage ? (
                  <img src={firstImage} alt={product.name} className="product-image" />
                ) : (
                  <div className="product-image placeholder">No Image</div>
                )}
                <h3>{product.name}</h3>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Reverse Slider */}
      <div className="slider-container">
        <Slider {...reverseSettings}>
          {products.map((product) => {
            const firstImage = Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : "";
            return (
              <div key={product._id} className="slide-card">
                {firstImage ? (
                  <img src={firstImage} alt={product.name} className="product-image" />
                ) : (
                  <div className="product-image placeholder">No Image</div>
                )}
                <h3>{product.name}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
