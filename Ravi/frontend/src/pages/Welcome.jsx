// import React, { useState } from "react";
// import "./BuyButton.css";

// const BuyButton = ({ onAddToCart, disabled = false }) => {
//   const [money, setMoney] = useState(100);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [cartConfirmed, setCartConfirmed] = useState(false);

//   const handleBuy = () => {
//     if (loading || success || disabled) return;

//     setLoading(true);

//     setTimeout(() => {
//       setSuccess(true);
//       setMoney((prev) => +(prev - 39.99).toFixed(2));

//       if (onAddToCart) {
//         onAddToCart();
//       }

//       setTimeout(() => {
//         setCartConfirmed(true);
//         document
//           .querySelector("meta[name='theme-color']")
//           ?.setAttribute("content", "#21d49a");
//       }, 1000);

//       setTimeout(() => {
//         setLoading(false);
//         setSuccess(false);
//         setCartConfirmed(false);
//       }, 10000);
//     }, 1000);
//   };

//   return (
//     <>
//       {/* Wallet Display (Optional) */}
//       {/* <div className="wallet-display">
//         <i className="fas fa-coins"></i>
//         <span>{money.toFixed(2)}</span>
//       </div> */}

//       <div
//         className={`cart-button ${loading ? "is-loading" : ""} ${success ? "is-success" : ""} ${disabled ? "disabled" : ""}`}
//         onClick={handleBuy}
//       >
//         {!loading && !success && <span>Add to Cart</span>}

//         {success && <i className="fa fa-check"></i>}

//         {loading && (
//           <>
//             <span className="status-text">Processing Cart...</span>
//             <div className="progress-bar"></div>
//           </>
//         )}

//         <div className={`cart-notice ${cartConfirmed ? "active" : ""}`}>
//           <i className="fas fa-shipping-fast" aria-hidden="true"></i>
//           {cartConfirmed && <span className="cart-text">Item added to cart</span>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BuyButton;
