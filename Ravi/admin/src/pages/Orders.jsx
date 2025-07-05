import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [openOrderIndex, setOpenOrderIndex] = useState(null)

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error("Failed to update order status")
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Orders</h3>
      <div>
        {
          orders.map((order, index) => (
            <div
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
              key={index}
            >
              {/* Parcel Icon - toggle ordered items */}
              <img
                className='w-12 cursor-pointer hover:scale-105 transition-transform duration-150'
                src={assets.parcel_icon}
                alt="parcel"
                onClick={() => setOpenOrderIndex(openOrderIndex === index ? null : index)}
              />

              {/* Order Items and Address */}
              <div>
                {/* Conditionally render items */}
                {openOrderIndex === index && (
                  <div className="border border-gray-300 rounded p-2 mb-3 bg-gray-50 space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 items-center border-b pb-2 last:border-none"
                      >
                        <img
                          src={item.image && item.image.length > 0 ? item.image[0] : assets.placeholder_image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                        <div className="flex flex-col text-sm">
                          <span className="font-semibold">{item.name}</span>
                          <span>Qty: {item.quantity}</span>
                          {item.price && <span>Price: {currency}{item.price}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Address Info */}
                <p className='mt-3 mb-2 font-medium'>
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              {/* Order Summary */}
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Amount */}
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>

              {/* Status Dropdown */}
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='p-2 font-semibold border rounded'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
