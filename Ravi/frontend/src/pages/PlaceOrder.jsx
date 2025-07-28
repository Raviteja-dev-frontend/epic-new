import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [isPlacingUPIOrder, setIsPlacingUPIOrder] = useState(false);
  const [errors, setErrors] = useState({});

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
    pincode: '',
    country: 'India',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";

    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(formData.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";

    if (formData.country.trim().toLowerCase() !== 'india') {
      newErrors.country = "Only India is allowed";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter valid 10-digit Indian phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getOrderItems = () => {
    const orderItems = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          const product = products.find(p => p._id === productId);
          if (product) {
            orderItems.push({
              ...product,
              size,
              quantity: cartItems[productId][size]
            });
          }
        }
      }
    }
    return orderItems;
  };

  const placeUPIOrder = async () => {
    if (!validateForm()) return;
    const orderItems = getOrderItems();
    if (orderItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    setIsPlacingUPIOrder(true);
    try {
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        payment_method: 'upi'
      };

      const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('UPI Order Placed Successfully');
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(response.data.message || 'Failed to place UPI order.');
      }
    } catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
      toast.error('Something went wrong while placing UPI order.');
    } finally {
      setIsPlacingUPIOrder(false);
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
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (data.success) {
            toast.success("Payment Verified. Order Placed!");
            setCartItems({});
            navigate('/orders');
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (method === 'upi') return; // prevent submit for UPI

    if (!validateForm()) return;

    const orderItems = getOrderItems();
    if (orderItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount(),
      payment_method: method
    };

    try {
      switch (method) {
        case 'cod': {
          const res = await axios.post(`${backendUrl}/api/order/place`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.success) {
            toast.success('Order placed successfully');
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(res.data.message || 'Failed to place COD order.');
          }
          break;
        }

        case 'stripe': {
          const res = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.success) {
            window.location.replace(res.data.session_url);
          } else {
            toast.error(res.data.message || 'Stripe payment failed');
          }
          break;
        }

        case 'razorpay': {
          const res = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.success) {
            initPay(res.data.order);
          } else {
            toast.error(res.data.message || 'Razorpay failed to initialize');
          }
          break;
        }

        default:
          toast.error("Invalid payment method");
      }
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      toast.error("Something went wrong while placing order.");
    }
  };

  const encodedUPI = encodeURI(
    `upi://pay?pa=pattemanosh@ybl&pn=EpicMoments&am=${getCartAmount()}&cu=INR`
  );

  const orderItems = getOrderItems();

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="email" name='email' value={formData.email} onChange={onChangeHandler} placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input name='pincode' value={formData.pincode} onChange={onChangeHandler} placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input name='country' value='India' readOnly className='border border-gray-300 rounded py-1.5 px-3.5 w-full bg-gray-100' />
        <input
          name='phone'
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
              setFormData((prev) => ({ ...prev, phone: value }));
            }
          }}
          placeholder='Phone'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          inputMode='numeric'
          pattern='[0-9]{10}'
          maxLength={10}
        />

        {Object.keys(errors).length > 0 && (
          <div className="text-red-600 text-sm">
            {Object.values(errors).map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}

        {method === 'upi' && orderItems.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold mb-2">Scan & Pay via UPI</p>
            <div style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
              <QRCode value={encodedUPI} size={200} />
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Pay ₹{getCartAmount()} to <strong>Epic Moments</strong>
            </p>

            {!isPlacingUPIOrder ? (
              <button
                onClick={placeUPIOrder}
                type="button"
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
              >
                I've Paid via UPI – Place Order
              </button>
            ) : (
              <p className="mt-4 text-green-600 font-semibold">Placing your order...</p>
            )}
          </div>
        )}
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <label className='flex items-center gap-2 cursor-pointer border p-2 px-3 rounded'>
              <input type="radio" name="payment" checked={method === 'cod'} onChange={() => setMethod('cod')} />
              <span className='text-sm text-gray-600'>Cash on Delivery</span>
            </label>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
               <span className='text-sm text-gray-600'>Razorpay</span>
            </div>
            <label className='flex items-center gap-2 cursor-pointer border p-2 px-3 rounded'>
              <input type="radio" name="payment" checked={method === 'upi'} onChange={() => setMethod('upi')} />
              <span className='text-sm text-gray-600'>UPI QR Code</span>
            </label>
          </div>

          {method !== 'upi' && (
            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
                PLACE ORDER
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
