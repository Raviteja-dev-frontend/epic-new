import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import SlidesList from './pages/SlidesList';
import SlidesAdding from './pages/SlidesAdding';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CatagereList from './pages/CatagereList';
import Catagere from './pages/Catagere';
import ManageCategory from './pages/ManageCategory';
import EnquiryList from './pages/EnquiryList';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '';

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ''
        ? <Login setToken={setToken} />
        : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/SlidesList' element={<SlidesList token={token} />} />
                  <Route path='/SlidesAdding' element={<SlidesAdding token={token} />} />
                  <Route path='/catagereList' element={<CatagereList token={token} />} />
                  <Route path='/catagereAdd' element={<Catagere token={token} />} />
<Route path='/manageCategory' element={<ManageCategory token={token} />} />  
                  <Route path='/enquiries' element={<EnquiryList />} />
              </Routes>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default App;
