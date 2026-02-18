import React from 'react'
import HeaderImage from '../../components/header-image/HeaderImage'
import FoodCard from '../../components/food-display-card/FoodCard'

const HomeFood = ({addCartData}) => {
    return (
        <div>
            <HeaderImage />
            <div className='flex justify-center   mt-10'>
                <FoodCard addCartData={addCartData} />

            </div>
        </div>
    )
}

export default HomeFood