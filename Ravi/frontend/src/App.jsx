import React,{useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import MainPage from './pages/MainPage'
import Orders from './pages/Orders'
//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import SendOrderMail from './components/sendOrderMail.jsx'; // ✅ Capitalized
//Libraries
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,         // Animation duration in ms
      once: true,             // Animate only once
      offset: 100,            // How far from the element trigger (px)
      easing: 'ease-in-out',  // Easing function
    });
  }, []);

  return (
    <div>
        {/* Toast Notifications */}
      <ToastContainer />

      {/* Navbar */}
      <Navbar />
       {/* Main Content */}
      <div className="pt-20">
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/sendOrderMail' element={<SendOrderMail />} />
        </Routes>
      </div>
      
       {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
