import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Order = () => {

   const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/my/order/admin");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
   <div className="container py-4">

      <h2 className="mb-4">Admin - All Orders</h2>

      <div className="card">
        <div className="card-body">

          <table className="table table-hover">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Order Status</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>

              {
                orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Orders Found
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>

                      <td>
                        {new Date(order.createdAt).toLocaleString()}
                      </td>

                      <td>₹{order.totalAmount}</td>

                      <td>
                        <span className="badge bg-success">
                          {order.orderStatus}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-primary">
                          {order.paymentStatus}
                        </span>
                      </td>

                    </tr>
                  ))
                )

              }

            </tbody>

          </table>

        </div>
      </div>

    </div>
  )
}

export default Order