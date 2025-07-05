import React from 'react';
import { assets } from '../assets/assets.js';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='hero-left'>
        <div className='hero-text'>
          <div className='hero-subtitle'>
            <h1 className='hero-label-1'>Welcome to</h1>
            <h2 className="hero-label-3">epic moments</h2>
          </div>

          <div className="hero-title_description">
            <p>Every Gift Tells a Story Make Yours Special and Personal</p>
          </div>

          <Link to="/collection" className="Download-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32">
              <path d="..." fill="white" />
            </svg>
            <span>GET STARTED</span>
          </Link>
        </div>
      </div>

      <div className='hero-right'>
        <img className='hero-image-test' src={assets.gift_box} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;
