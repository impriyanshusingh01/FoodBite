import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { CartContext } from '../../context/CartContext'

const Cart = () => {

    const [cartData, setCartData] = useState(null)
    const token = localStorage.getItem('token')
    const {fetchCartList} = useContext(CartContext)

    const getCartData = async () => {
        const res = await axios.get("http://localhost:8080/cart/calculate", { headers: { Authorization: `Bearer ${token}` } })
   
        setCartData(res.data)
    }

    const updateQuantityData = async(cartItemId, qty) => {
        const res = await axios.patch("http://localhost:8080/cart"+"/" + cartItemId,{quantity: qty},{ headers: { Authorization: `Bearer ${token}` } })
        setCartData(res.data)
       
        fetchCartList()
    }

    const deleteCartData = async (cartItemId) => {
        const res = await axios.delete("http://localhost:8080/cart"+"/"+cartItemId, { headers: { Authorization: `Bearer ${token}` } })
        setCartData(res.data)
          fetchCartList()
    }

    useEffect(() => {
        getCartData()
    }, [])

    
    return (

        <div className="container py-5">
            <h1 className="mb-5">Your Shopping Cart</h1>
            <div className="row">
                <div className="col-lg-8">

                    {
                        cartData?.items?.length === 0 && (
                            <p>your cart is emplty.</p>
                        )
                    }
                    


                    <div className="card mb-4">
                        <div className="card-body">

                            {
                                cartData?.items?.map((cart) => (
                                    <div key={cart.cartItemId} className="row cart-item mb-3">

                                    
                                        <div className="col-md-3">
                                            <img
                                                src={cart.imageUrl}
                                                alt={cart.foodName}
                                                className="img-fluid rounded"
                                                width={100}
                                            />
                                        </div>

                                    
                                        <div className="col-md-5">
                                            <h5 className="card-title">{cart.foodName}</h5>
                                            <p className="text-muted">Qty: {cart.quantity}</p>
                                        </div>

                                   
                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantityData(cart.cartItemId, cart.quantity - 1)}>-</button>

                                                <input
                                                    style={{ maxWidth: "100px" }}
                                                    type="text"
                                                    className="form-control form-control-sm text-center"
                                                    value={cart.quantity}
                                                    readOnly
                                                />

                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantityData(cart.cartItemId, cart.quantity + 1)}>+</button>
                                            </div>
                                        </div>

                                    
                                        <div className="col-md-2 text-end">
                                            <p className="fw-bold">
                                                ₹{(cart.price * cart.quantity).toFixed(2)}
                                            </p>

                                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCartData(cart.cartItemId)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>

                                        <hr />
                                    </div>
                                ))
                            }




                        </div>
                    </div>


                    <div className="text-start mb-4">
                        <Link to={'/'} className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">

                    <div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>{cartData?.subtotal?.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>{cartData?.deliveryCharge?.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>{cartData?.tax?.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>{cartData?.totalAmount}</strong>
                                <strong></strong>
                            </div>
                            <Link to="/order"><button className="btn btn-primary w-100" >Proceed to Checkout</button></Link>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Cart