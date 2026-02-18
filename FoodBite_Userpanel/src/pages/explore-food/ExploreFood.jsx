import React, { useState } from 'react'
import SearchBox from '../../components/search-box/SearchBox'
import FoodCard from '../../components/food-display-card/FoodCard'

const ExploreFood = ({addCartData}) => {
    const [searchTextCategory, setSearchTextCategory] = useState("")
    const [categoryPass, setCategoryPass] = useState("All")
  return (
    <div>
        <SearchBox setCategoryPass={setCategoryPass}  setSearchTextCategory={setSearchTextCategory} />
        <div className='flex justify-center   mt-10'> 

        <FoodCard categoryPass={categoryPass} searchTextCategory={searchTextCategory}  addCartData={addCartData}/>
        </div>

    </div>
  )
}

export default ExploreFood