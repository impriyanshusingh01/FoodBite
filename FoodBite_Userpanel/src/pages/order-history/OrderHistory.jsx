import axios from 'axios';
import React, { useState, useEffect } from 'react'

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/my/order",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setOrders(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
     <div className="container py-5">

      <h2 className="mb-4">My Orders</h2>

      {
        orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(order => {
            return(
                <div key={order.orderId} className="card mb-3">
              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <div>
                    <h5>Order ID: {order.orderId}</h5>
                    <p className="text-muted mb-1">
                      Date: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="mb-0">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>

                  <div className="text-end">
                    <span className="badge bg-success">
                      {order.orderStatus}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            )
          }
           
        )) 
    }

            
        

    </div>
  )
}

export default OrderHistory