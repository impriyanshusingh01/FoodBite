import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext';

const Order = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {fetchCartList} = useContext(CartContext)

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        pincode: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress(address => ({ ...address, [name]: value }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
      try {
          const res = await axios.post("http://localhost:8080/my/order", address, { headers: { Authorization: `Bearer ${token}` } })
        setAddress({ fullName: "", phone: "", street: "", city: "", pincode: "" })
        toast.success("your order placed successfully")
        fetchCartList();
        navigate("/order/history")


      } catch (error) {
         toast.error("your order not placed successfully")
      }
    }

    return (
        <div className="container py-5">

            <h2 className="mb-4">Checkout</h2>
            <form onSubmit={submitHandler}>
            <div className="card p-4">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label>Full Name</label>
                        <input
                            name="fullName"
                            className="form-control"
                            value={address.fullName}
                          onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Phone</label>
                        <input
                            name="phone"
                            className="form-control"
                             value={address.phone}
                          onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <label>Street Address</label>
                        <input
                            name="street"
                            className="form-control"
                             value={address.street}
                          onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>City</label>
                        <input
                            name="city"
                            className="form-control"
                             value={address.city}
                          onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-4">
                        <label>Pincode</label>
                        <input
                            name="pincode"
                            className="form-control"
                            value={address.pincode}
                          onChange={handleChange}
                        />
                    </div>

                </div>

                <button
                   type='submit' className="btn btn-primary w-100"
                  
                >
                    Place Order
                </button>

            </div>

            </form>

        </div>
    )
}

export default Order