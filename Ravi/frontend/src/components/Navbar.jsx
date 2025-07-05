import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='navbar-container'>
      <div className='flex items-center justify-between font-medium'>

        {/* Logo */}
        <div className="navbar-logo-container">
          <img src={assets.logo_epicmoments} alt="Epic Moments Logo" />
        </div>

        {/* Menu - Desktop */}
        <ul className='hidden sm:flex gap-6 text-sm text-gray-100'>
          {['/', '/collection', '/about', '/contact'].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`
              }
            >
              <p>{['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'][i]}</p>
            </NavLink>
          ))}
        </ul>

        {/* Right Icons */}
        <div className='flex items-center gap-6 z-10'>

          {/* Search */}
          <img
            onClick={() => { setShowSearch(true); navigate('/collection'); }}
            src={assets.search_icon}
            className='w-6 cursor-pointer transition duration-200 hover:scale-110 filter invert'
            alt="Search"
          />

          {/* Profile */}
          <div className='group relative profile-menu'>
            <img
              onClick={() => !token && navigate('/login')}
              className='w-6 cursor-pointer transition duration-200 hover:scale-110 filter invert'
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && (
              <div className='group-hover:block hidden absolute right-0 pt-4 z-50'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded shadow-md'>
                  <p className='cursor-pointer hover:text-black'>My Profile</p>
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to='/cart' className='relative cart-icon'>
            <img
              src={assets.cart_icon}
              className='w-6 transition duration-200 hover:scale-110 filter invert'
              alt="Cart"
            />
            <p className='cart-count'>{getCartCount()}</p>
          </Link>

          {/* Mobile Menu */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-6 cursor-pointer sm:hidden transition duration-200 hover:scale-110 filter invert'
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${visible ? 'open' : ''}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
