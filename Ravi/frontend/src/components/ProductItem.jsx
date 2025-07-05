// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import {Link} from 'react-router-dom'

// const ProductItem = ({id,image,name,price}) => {
    
//     const {currency} = useContext(ShopContext);

//   return (
//     <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
//       <div className=' overflow-hidden'>
//         <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
//       </div>
//       <p className='pt-3 pb-1 text-sm'>{name}</p>
//       <p className=' text-sm font-medium'>{currency}{price}</p>
//     </Link>
//   )
// }

// export default ProductItem

import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import './ProductItem.css';
import { FaShoppingCart, FaCheck, FaInfoCircle } from "react-icons/fa";

const ProductItem = ({ id, image, name, price, description }) => {
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
    <div className='product-item'>
      <div className="Product_Card_wrapper">
        <div className="Product_Card_container">
          <div className="Product_Card_top">
            <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
              <img src={image[0]} alt={name} />
            </Link>
          </div>
          <div className={`bottom ${clicked ? "clicked" : ""}`}>
            <div className="Product_Card_left">
              <div className="Product_Card_details">
                <p className='product-name'>{name}</p>
                <p className='product-price-1'>{currency}&nbsp;&nbsp;{price}</p>
              </div>
              {!clicked && (
                <div className="Product_Card_buy" onClick={handleCartClick}>
                  <FaShoppingCart />
                </div>
              )}
            </div>
            {clicked && (
              <div className="Product_Card_right">
                <div className="Product_Card_details">
                  <h1>{name}</h1>
                  <p>Added to your cart</p>
                </div>
                <div className="Product_Card_done">
                  <FaCheck />
                </div>
                
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Description Section */}
        <div className="Product_Card_inside-1">
          <div className="Product_Card_icon">
            <FaInfoCircle />
          </div>
          <div className="Product_Card_Description">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
