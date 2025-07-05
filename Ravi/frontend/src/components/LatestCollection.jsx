import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import "../pages/MainPage.css";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Track screen width
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update latest products based on screen width
  useEffect(() => {
    if (!products || products.length === 0) return;

    let count = 10;

    if (screenWidth >= 800 && screenWidth <= 1270) {
      count = 9;
    }

    setLatestProducts(products.slice(0, count));
  }, [products, screenWidth]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <h1 className='hero-label-1'>Latest Collections</h1>
        <p className='hero-description-1'>
          Explore personalized gifts made to celebrate your special moments from photo frames to custom mugs.
        </p>
      </div>

      <div className='latest-grid-wrapper'>
        <div className='latest-grid'>
          {latestProducts.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
