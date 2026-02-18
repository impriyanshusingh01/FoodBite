import React, { useContext, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { ToastContainer} from 'react-toastify'
import {Routes, Route} from 'react-router-dom'
import ExploreFood from './pages/explore-food/ExploreFood'
import HomeFood from './pages/home-food/HomeFood'
import FoodItem from './components/food-item/FoodItem'
import Contact from './pages/contact-us/Contact'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Cart from './pages/cart/Cart'
import axios from 'axios'
import { CartContext } from './context/CartContext'
import Order from './pages/order/Order'
import OrderHistory from './pages/order-history/OrderHistory'

const App = () => {

  const[isLogin, setLogin] = useState(!!localStorage.getItem("token"))
  const {fetchCartList} = useContext(CartContext)

  const token = localStorage.getItem('token')

 const addCartData = async(foodId) => {
  const res = await axios.post(`http://localhost:8080/cart/${foodId}`, {quantity: 1}, {headers: {Authorization: `Bearer ${token}`}})
  fetchCartList()
}
       

  return (
    <div>

    <Navbar isLogin={isLogin} setLogin={setLogin}/>
    <div>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<HomeFood addCartData={addCartData} />} />
        <Route path='/explore' element={<ExploreFood addCartData={addCartData} />} />
        <Route path='/item/:id' element={<FoodItem addCartData={addCartData} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setLogin={setLogin} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/Order/history' element={<OrderHistory />} />
      </Routes>
      
    </div>

    </div>
  )
}

export default App