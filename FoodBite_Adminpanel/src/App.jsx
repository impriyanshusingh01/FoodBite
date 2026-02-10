import React from 'react'
import AddFood from './pages/Add food/AddFood'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import LIstFood from './pages/List food/LIstFood'
import Order from './pages/Order/Order'
import { ToastContainer} from 'react-toastify'


const App = () => {
  return (
    <>
      <div className='d-flex' id='wrapper'>
        <Sidebar />
        <div id='page-content-wrapper'>

          <Navbar />

          <div >
            <ToastContainer />
           <Routes>
            <Route path='/' element={<AddFood/>} />
            <Route path='/add' element={<AddFood/>} />
            <Route path='/list' element={<LIstFood/>} />
            <Route path='/order' element={<Order/>} />
           </Routes>

          </div>
        </div>
      </div>
    </>

  )
}

export default App