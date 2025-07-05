import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [upiConfirmed, setUpiConfirmed] = useState(false);
  const [isPlacingUPIOrder, setIsPlacingUPIOrder] = useState(false);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (method === 'upi') {
      if (!upiConfirmed) {
        toast.error("Please confirm UPI payment before placing the order.");
      }
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        payment_method: method
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
          if (data.success) {
            setCartItems({});
            navigate('/orders');
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Auto UPI order handler
  const placeUPIOrder = async () => {
    setIsPlacingUPIOrder(true);
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const product = products.find(p => p._id === items);
            if (product) {
              const itemInfo = JSON.parse(JSON.stringify(product));
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        payment_method: 'upi'
      };

      const response = await axios.post(backendUrl + '/api/order/place', orderData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success('UPI Order Placed Successfully');
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to place UPI order');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required name='email' value={formData.email} onChange={onChangeHandler} placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required name='country' value={formData.country} onChange={onChangeHandler} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required name='phone' value={formData.phone} onChange={onChangeHandler} placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        {method === 'upi' && (
          <div className="mt-4 text-center">
            {!upiConfirmed ? (
              <>
                <p className="text-lg font-semibold mb-2">Scan & Pay via UPI</p>
                <div style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
                  <QRCode value={`upi://pay?pa=pattemanosh@ybl&pn=Epic Moments&am=${getCartAmount()}&cu=INR`} size={200} />
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  Pay ₹{getCartAmount()} to <strong>Epic Moments</strong>
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="upiConfirm"
                    checked={upiConfirmed}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUpiConfirmed(true);
                        toast.success("Payment Confirmed. Placing Order...");
                        setTimeout(() => {
                          placeUPIOrder();
                        }, 3000);
                      } else {
                        setUpiConfirmed(false);
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="upiConfirm" className="text-sm text-gray-700">
                    I have completed the UPI payment
                  </label>
                </div>
              </>
            ) : (
              <p className="text-green-600 font-semibold mt-4">UPI Payment Confirmed. Placing your order...</p>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('upi')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'upi' ? 'bg-green-400' : ''}`}></p>
              <p className='text-sm text-gray-600'>UPI QR</p>
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-1 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Order Confirm after Payment</p>
            </div>
          </div>

          {method !== 'upi' && (
            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
