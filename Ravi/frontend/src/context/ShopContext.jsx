// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {

//    const currency = '₹';
//     const delivery_fee = 0;
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//     const [search, setSearch] = useState('');
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});
//     const [products, setProducts] = useState([]);
//     const [token, setToken] = useState('')
//     const navigate = useNavigate();
//     const [slides, setSlides] = useState([]);
//  const [catagere, setCatagere] = useState([]);

//     const addToCart = async (itemId, size) => {

//         if (!size) {
//             toast.error('Select Product Size');
//             return;
//         }

//         let cartData = structuredClone(cartItems);

//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1;
//             }
//             else {
//                 cartData[itemId][size] = 1;
//             }
//         }
//         else {
//             cartData[itemId] = {};
//             cartData[itemId][size] = 1;
//         }
//         setCartItems(cartData);

//         if (token) {
//             try {

//                 await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.message)
//             }
//         }

//     }

//     const getCartCount = () => {
//         let totalCount = 0;
//         for (const items in cartItems) {
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalCount += cartItems[items][item];
//                     }
//                 } catch (error) {

//                 }
//             }
//         }
//         return totalCount;
//     }

//     const updateQuantity = async (itemId, size, quantity) => {

//         let cartData = structuredClone(cartItems);

//         cartData[itemId][size] = quantity;

//         setCartItems(cartData)

//         if (token) {
//             try {

//                 await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.message)
//             }
//         }

//     }

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             let itemInfo = products.find((product) => product._id === items);
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalAmount += itemInfo.price * cartItems[items][item];
//                     }
//                 } catch (error) {

//                 }
//             }
//         }
//         return totalAmount;
//     }

//     const getProductsData = async () => {
//         try {

//             const response = await axios.get(backendUrl + '/api/product/list')
//             if (response.data.success) {
//                 setProducts(response.data.products.reverse())
//             } else {
//                 toast.error(response.data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     const getUserCart = async ( token ) => {
//         try {
            
//             const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
//             if (response.data.success) {
//                 setCartItems(response.data.cartData)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }
//   const getSlidesData = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/slides/list');
//       if (response.data.success && Array.isArray(response.data.slides)) {
//         setSlides(response.data.slides.reverse());
//       } else {
//         toast.error(response.data.message || "Failed to fetch slides");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//  const getCatagereData = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/catagere/list');
//       if (response.data.success) {
//         setCatagere(response.data.catageres.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//     useEffect(() => {
//         getProductsData();
//          getSlidesData();
//             getCatagereData();
//     }, [])

//     useEffect(() => {
//         if (!token && localStorage.getItem('token')) {
//             setToken(localStorage.getItem('token'))
//             getUserCart(localStorage.getItem('token'))
//         }
//         if (token) {
//             getUserCart(token)
//         }
//     }, [token])

//     const value = {
//         products, currency, delivery_fee,
//         search, setSearch, showSearch, setShowSearch,
//         cartItems, addToCart,setCartItems,
//         getCartCount, updateQuantity,
//         getCartAmount, navigate, backendUrl,
//         setToken, token,slides,catagere,
//     }

//     return (
//         <ShopContext.Provider value={value}>
//             {props.children}
//         </ShopContext.Provider>
//     )

// }

// export default ShopContextProvider;



import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [slides, setSlides] = useState([]);
  const [catagere, setCatagere] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const navigate = useNavigate();

  // ✅ Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const cartData = JSON.parse(JSON.stringify(cartItems));
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Cart Add Error:", error.response?.data || error.message);
        toast.error(error.message);
      }
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = JSON.parse(JSON.stringify(cartItems));
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Cart Update Error:", error.response?.data || error.message);
        toast.error(error.message);
      }
    }
  };

  // ✅ Get Cart Count
  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  // ✅ Get Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        totalAmount += product.price * quantity;
      }
    }
    return totalAmount;
  };

  // ✅ Fetch Products
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products.reverse());
      } else {
        toast.error(res.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Products Fetch Error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  // ✅ Fetch Slides
  const getSlidesData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/slides/list`);
      if (res.data.success && Array.isArray(res.data.slides)) {
        setSlides(res.data.slides.reverse());
      } else {
        toast.error(res.data.message || "Failed to fetch slides");
      }
    } catch (error) {
      console.error("Slides Fetch Error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  // ✅ Fetch Catagere
  const getCatagereData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/catagere/list`);
      if (res.data.success) {
        setCatagere(res.data.catageres.reverse());
      } else {
        toast.error(res.data.message || "Failed to fetch catagere");
      }
    } catch (error) {
      console.error("Catagere Fetch Error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  // ✅ Fetch Keywords
  const getKeywordsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/keyword`);
      if (res.data.success) {
        setKeywords(res.data.keywords);
      } else {
        toast.error(res.data.message || "Failed to fetch keywords");
      }
    } catch (error) {
      console.error("Keywords Fetch Error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  // ✅ Fetch Cart from DB
  const getUserCart = async (currentToken) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.error("Cart Fetch Error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  // ✅ Load initial data
  useEffect(() => {
    getProductsData();
    getSlidesData();
    getCatagereData();
    getKeywordsData();
  }, []);

  // ✅ Sync token & fetch cart
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    } else if (token) {
      getUserCart(token);
    }
  }, [token]);

  // ✅ Debug slide change
  useEffect(() => {
    console.log("Slides updated:", slides);
  }, [slides]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    slides,
    catagere,
    keywords,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
