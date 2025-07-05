import React from "react";
import Slider from "react-slick";
import './Slider_Comments.css'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { assets } from "../assets/assets";
const ProfileSlider = () => {
  const comments = [
    {
      id: 1,
      name: "Suresh",
      comment: "This service is amazing! Highly recommended.",
     pic: assets.suresh 
    },
    {
      id: 2,
      name: "Dr.Sri Divya",
      comment: "Great experience, will definitely use again!",
 pic: assets.divya 
    },
    {
      id: 3,
      name: "M.S R Krishna",
      comment: "Friendly support and excellent design work.",
   pic: assets.siva 
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="slider-comments">
      <Slider {...settings}>
        {comments.map(comment => (  
          <div key={comment.id} className="profile-slide">
            <div className="ima_name">
              <img className="profile-pic" src={comment.pic} alt={comment.name} loading="lazy" />
              <h2>{comment.name}</h2>
            </div>
            <p>"{comment.comment}"</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProfileSlider;
