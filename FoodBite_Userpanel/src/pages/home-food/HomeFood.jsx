import React from 'react'
import HeaderImage from '../../components/header-image/HeaderImage'
import FoodCard from '../../components/food-display-card/FoodCard'

const HomeFood = () => {
    return (
        <div>
            <HeaderImage />
            <div className='flex justify-center   mt-10'>
                <FoodCard />

            </div>
        </div>
    )
}

export default HomeFood