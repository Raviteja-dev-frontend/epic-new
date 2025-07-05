import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCheck, FaInfoCircle } from "react-icons/fa";
import './bestcollections.css';

const BestItem = ({ id, image, name, price, description }) => {
  const { currency } = useContext(ShopContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate(`/product/${id}`);
    }, 3000);
  };

  return (
    <div className="bc-product-item">
      <div className="bc-card-wrapper">
        <div className="bc-card-container">
          <div className="bc-card-top">
            <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
              <img src={image[0]} alt={name} />
            </Link>
          </div>

          <div className={`bc-card-bottom ${clicked ? 'clicked' : ''}`}>
            <div className="bc-card-left">
              <div className="bc-card-details">
                <p className="bc-product-name">{name}</p>
                <p className="bc-product-price">{currency} {price}</p>
              </div>
              {!clicked && (
                <div className="bc-card-cart" onClick={handleCartClick}>
                  <FaShoppingCart />
                </div>
              )}
            </div>

            {clicked && (
              <div className="bc-card-right">
                <div className="bc-card-details">
                  <h1>{name}</h1>
                  <p>Added to your cart</p>
                </div>
                <div className="bc-card-check">
                  <FaCheck />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bc-description-container">
          <div className="bc-description-icon">
            <FaInfoCircle />
          </div>
          <div className="bc-description-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestItem;
