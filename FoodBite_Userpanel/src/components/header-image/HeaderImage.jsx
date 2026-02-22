import React from 'react'
import { assets } from '../../assets/assets'
import './Header.css'
const HeaderImage = () => {
  return (
     <header className="bg-dark">
            <div className="h-[50vh] bg-no-repeat bg-cover"  style={{ backgroundImage: `url(${assets.heroImage})` }}>
              
            </div>
        </header>
  )
}

export default HeaderImage