import React from 'react'
import Navbar from './components/navbar/Navbar'
import { ToastContainer} from 'react-toastify'
import {Routes, Route} from 'react-router-dom'
import ExploreFood from './pages/explore-food/ExploreFood'
import HomeFood from './pages/home-food/HomeFood'
import FoodItem from './components/food-item/FoodItem'

const App = () => {
  return (
    <div>

    <Navbar />
    <div>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<HomeFood />} />
        <Route path='/explore' element={<ExploreFood />} />
        <Route path='/item' element={<FoodItem />} />
      </Routes>
      
    </div>

    </div>
  )
}

export default App