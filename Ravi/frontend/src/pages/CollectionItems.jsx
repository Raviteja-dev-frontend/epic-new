import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaInfoCircle, FaCheck } from 'react-icons/fa';
import './CollectionItem.css';

const CollectionItems = ({ id, image, name, price, description }) => {
  const { currency } = useContext(ShopContext);
  const [showDetails, setShowDetails] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      navigate(`/product/${id}`);
    }, 3000);
  };

  return (
    <div className='collection-card-item'>
      <div className="collection-card-wrapper">
        <div className="collection-card-container">
          {/* Image Top */}
          <div className="collection-card-top">
            <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
              <img src={image[0]} alt={name} />
            </Link>
          </div>

          {/* Bottom Sliding Section */}
          <div className={`collection-card-bottom ${added ? "clicked" : ""}`}>
            <div className="collection-card-left">
              <div className="collection-card-details">
                <p className='collection-card-name'>{name}</p>
                <p className='collection-card-price'>{currency} {price}</p>
              </div>

              {!added && (
                <div className="collection-card-buy" onClick={handleAddToCart}>
                  <FaShoppingCart />
                </div>
              )}
            </div>

            {added && (
              <div className="collection_Card_right">
                <div className="collection_Card_details">
                  <h1>{name}</h1>
                  <p>Added to your cart</p>
                </div>
                <div className="collection-card-done">
                  <FaCheck />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Toggle Section */}
        <div
          className="collection-card-overlay cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="collection-card-icon">
            <FaInfoCircle />
          </div>

          {/* Description Container with toggled class */}
          <div className={`collection-card-description ${showDetails ? 'show' : ''}`}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionItems;




