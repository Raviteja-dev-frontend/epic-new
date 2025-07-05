import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

import './Product.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [description, setDescription] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const found = products.find(item => item._id === productId);
      if (found) {
        setProductData(found);
        setImage(found.image[0]);
        setDescription(found.description);
        setReviews(found.reviews || []);
      } else {
        try {
          const res = await fetch(`/api/product/${productId}`);
          const data = await res.json();
          setProductData(data);
          setImage(data.image[0]);
          setDescription(data.description);
          setReviews(data.reviews || []);
        } catch (err) {
          console.error("Failed to fetch product:", err);
        }
      }
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className='opacity-0'>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`product-${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="selected product" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={productData.rating >= star ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-4 h-4"
              />
            ))}
            <p className='pl-2 text-sm text-gray-600'>
              {productData.rating?.toFixed(1)} / 5 ({productData.customers || reviews.length} reviews)
            </p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.shortDescription || ''}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
  {productData.sizes.map((item, index) => (
    <button
      onClick={() => setSize(item)}
      className={`size-btn ${item === size ? 'active-size' : ''}`}
      key={index}
    >
      {item}
    </button>
  ))}
</div>

<input hidden="" className="cart-toggle-1" id="cart-toggle-1" type="checkbox" onClick={()=>addToCart(productData._id,size)}  />
 <label className="cart-button-1" for="cart-toggle-1">
   <span className="cart-icon-1">
     <svg
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="1" cy="21" cx="9"></circle>
      <circle r="1" cy="21" cx="20"></circle>
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
      ></path>
    </svg>
  </span>

  Add to Cart
  <div className="progress-bar-1"></div>
</label>

          </div>

        

          <hr className='mt-8 sm:w-4/5' />

          <div className='mt-6 text-sm '>
  <h3 className='font-semibold text-red-600 mb-2'>Please Read Before Placing Your Order:</h3>
  <ul className='list-disc list-inside space-y-1'>
    <li>Ensure the correct size is selected before adding to cart.</li>
    <li>Customized items are non-returnable unless damaged.</li>
    <li>Delivery takes 5-7 working days across India.</li>
    <li>Provide an accurate shipping address and contact number.</li>
    <li>Contact support within 2 hours for order modifications.</li>
  </ul>
</div>
        </div>
      </div>

      {/* Description and Reviews Tabs */}
      <div className="mt-20">
        <div className="flex">
          <button
            onClick={() => setActiveTab('description')}
            className={`border px-5 py-3 text-sm font-bold ${activeTab === 'description' ? 'bg-gray-100' : ''}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-100' : ''}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="border p-4 mt-2">
          {activeTab === 'description' && <p>{description}</p>}
          {activeTab === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="border-b py-2 last:border-b-0">
                    <p className="font-semibold">{review.reviewer || 'Anonymous'}</p>
                    <p className="text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-500">Rating: {review.rating}/5</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// import './Product.css';
// const Product = () => {

//   const { productId } = useParams();
//   const { products, currency ,addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('')
//   const [size,setSize] = useState('')

//   const fetchProductData = async () => {

//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item)
//         setImage(item.image[0])
//         return null;
//       }
//     })

//   }

//   useEffect(() => {
//     fetchProductData();
//   }, [productId,products])

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/*----------- Product Data-------------- */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

//         {/*---------- Product Images------------- */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//               {
//                 productData.image.map((item,index)=>(
//                   <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
//                 ))
//               }
//           </div>
//           <div className='w-full sm:w-[80%]'>
//               <img className='w-full h-auto' src={image} alt="" />
//           </div>
//         </div>

//         {/* -------- Product Info ---------- */}
//         <div className='flex-1'>
//           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//           <div className=' flex items-center gap-1 mt-2'>
//               <img src={assets.star_icon} alt="" className="w-3 5" />
//               <img src={assets.star_icon} alt="" className="w-3 5" />
//               <img src={assets.star_icon} alt="" className="w-3 5" />
//               <img src={assets.star_icon} alt="" className="w-3 5" />
//               <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//               <p className='pl-2'>(122)</p>
//           </div>
//           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
//           <div className='flex flex-col gap-4 my-8'>
//               <p>Select Size</p>
//               <div className='flex gap-2'>
//                 {productData.sizes.map((item,index)=>(
//                   <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
//                 ))}
//               </div>
//           </div>
//           <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
//           <hr className='mt-8 sm:w-4/5' />
//           <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//               <p>100% Original product.</p>
//               <p>Cash on delivery is available on this product.</p>
//               <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       {/* ---------- Description & Review Section ------------- */}
//       <div className='mt-20'>
//         <div className='flex'>
//           <b className='border px-5 py-3 text-sm'>Description</b>
//           <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
//         </div>
//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
//           <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
//         </div>
//       </div>

//       {/* --------- display related products ---------- */}

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

//     </div>
//   ) : <div className=' opacity-0'></div>
// }

// export default Product


// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// import './Product.css';
// const Product = () => {

//   const { productId } = useParams();
//   const { products, currency ,addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('')
//   const [size,setSize] = useState('')
//     const [activeTab, setActiveTab] = useState('description');
//   const [description, setDescription] = useState('');
//   const [reviews, setReviews] = useState([]);

//   const fetchProductData = async () => {

//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item)
//         setImage(item.image[0])
//         return null;
//       }
//     })

//   }

//   useEffect(() => {
//     fetchProductData();
//   }, [productId,products])

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/*----------- Product Data-------------- */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

//         {/*---------- Product Images------------- */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//               {
//                 productData.image.map((item,index)=>(
//                   <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
//                 ))
//               }
//           </div>
//           <div className='w-full sm:w-[80%]'>
//               <img className='w-full h-auto' src={image} alt="" />
//           </div>
//         </div>

//         {/* -------- Product Info ---------- */}
//         <div className='flex-1'>
//           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//          <div className='flex items-center gap-1 mt-2'>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <img
//                 key={star}
//                 src={productData.rating >= star ? assets.star_icon : assets.star_dull_icon}
//                 alt=""
//                 className="w-4 h-4"
//               />
//             ))}
//             <p className='pl-2 text-sm text-gray-600'>
//               {productData.rating?.toFixed(1)} / 5 ({productData.customers || reviews.length} reviews)
//             </p>
//           </div> 
//           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
//                     <div className='flex flex-col gap-4 my-8'>
//               <p>Select Size</p>
//               <div className='flex gap-2'>
//                 {productData.sizes.map((item,index)=>(
//                   <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
//                 ))}
//               </div>
           
//                       {/* <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button> */}
                   
// <input hidden="" class="cart-toggle" id="cart-toggle" type="checkbox" onClick={()=>addToCart(productData._id,size)}  />
// <label className="cart-button" for="cart-toggle">
//   <span className="cart-icon">
//     <svg
//       stroke-linejoin="round"
//       stroke-linecap="round"
//       stroke-width="2"
//       stroke="currentColor"
//       fill="none"
//       viewBox="0 0 24 24"
//       height="24"
//       width="24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle r="1" cy="21" cx="9"></circle>
//       <circle r="1" cy="21" cx="20"></circle>
//       <path
//         d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
//       ></path>
//     </svg>
//   </span>

//   Add to Cart
//   <div className="progress-bar"></div>
// </label>

//           </div>
// {/* <Welcome
//            disabled={!size}
//             onClick={() => addToCart(productData._id, size)}
//          />  */}
//           <hr className='mt-8 sm:w-4/5' />
//           <div className='mt-6 text-sm '>
//   <h3 className='font-semibold text-red-600 mb-2'>Please Read Before Placing Your Order:</h3>
//    <ul className='list-disc list-inside space-y-1'>
//     <li>Ensure the correct size is selected before adding to cart.</li>
//     <li>Customized items are non-returnable unless damaged.</li>
//     <li>Delivery takes 5-7 working days across India.</li>
//      <li>Provide an accurate shipping address and contact number.</li>
//     <li>Contact support within 2 hours for order modifications.</li>
//    </ul>
//  </div>
//         </div>
//       </div>

//       {/* ---------- Description & Review Section ------------- */}
//      <div className="mt-20">
//       <div className="flex">
//          <button
//           onClick={() => setActiveTab('description')}
//           className={`border px-5 py-3 text-sm font-bold ${activeTab === 'description' ? 'bg-gray-100' : ''}`}
//        >
//           Description
//         </button>
//          <button
//            onClick={() => setActiveTab('reviews')}
//            className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-100' : ''}`}
//          >
//                         Reviews ({reviews.length})
//          </button>
//         </div>

//          <div className="border p-4 mt-2">
//            {activeTab === 'description' && <p>{description}</p>}
//            {activeTab === 'reviews' && (
//              <div>
//                {reviews.length === 0 ? (
//                 <p>No reviews yet.</p>
//               ) : (
//                 reviews.map((review, index) => (
//                   <div key={index} className="border-b py-2 last:border-b-0">
//                     <p className="font-semibold">{review.reviewer || 'Anonymous'}</p>
//                     <p className="text-sm">{review.comment}</p>
//                  <p className="text-xs text-gray-500">Rating: {review.rating}/5</p>
//                 </div>
//               ))
//             )}
//           </div>
//          )}
//        </div>
//       </div>

//       {/* --------- display related products ---------- */}

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

//     </div>
//   ) : <div className=' opacity-0'></div>
// }

// export default Product
