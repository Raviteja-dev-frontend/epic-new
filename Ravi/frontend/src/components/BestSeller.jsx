import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import BestItem from './BestItem';
import './bestcollections.css';
import './ProductItem.css';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5)); // Display top 10 or whatever
  }, [products]);

  return (
    <div className="my-10">
      <div className="bestcollections_slide-top">
        <div className="screen-3-title">
          <h2>Best Sales</h2>
          <p>
            Make every moment unforgettable with our best-selling personalized
            gifts, crafted to delight and impress.
          </p>
        </div>
      </div>

      <div className="best-grid-wrapper">
        {bestSeller.map((item, index) => (
          <BestItem
            key={item._id || index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
