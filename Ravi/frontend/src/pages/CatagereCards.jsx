import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CatagereItem from "./ProductCatagere";
import "./MainPage.css";

const CatagereCards = () => {
  const { catagere } = useContext(ShopContext); // ✅ From context
  const [latestCatagere, setLatestCatagere] = useState([]);

  useEffect(() => {
    if (Array.isArray(catagere) && catagere.length > 0) {
      setLatestCatagere(catagere.slice(0, 10)); // ✅ Show latest 10
    }
  }, [catagere]);

  if (!latestCatagere || latestCatagere.length === 0) {
    return <p>No categories available.</p>;
  }

  return (
    <div className="Catagery_slide">
       <h2>shop by Categories</h2>
 <div className="Gift_catagery">
      
      {latestCatagere.map((item) => (
        <CatagereItem
          key={item._id}
          id={item._id}
          image={item.image} // ✅ Correct field name
          name={item.name}
        />
      ))}
    </div>
    </div>
   
  );
};

export default CatagereCards;
