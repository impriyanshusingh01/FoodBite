import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './foodCard.css'
import { foodDataList } from '../../service/foodBite';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import FoodItem from '../food-item/FoodItem';



const FoodCard = ({categoryPass = "All", searchTextCategory = ""}) => {

    const [foodList, setFoodList] = useState([]);
    
   
    const filterCategory = foodList.filter(food => {
       return ( categoryPass == "All" || food.category === categoryPass) &&
       food.name.toLowerCase().includes(searchTextCategory.toLowerCase())
    })

    const fetchFoodList = async () => {
       try {
         const res = await foodDataList()
        setFoodList(res)
       } catch (error) {
        toast.error("Error while fetching data")
       }
    }

    useEffect(() => {
        fetchFoodList();
    }, [])

    return (
        <div className='flex flex-wrap gap-4 w-[71vw]'>

            {filterCategory.map(food => {
                return (

                    <div
                        key={food.id} 
                        className="w-full max-w-xs bg-neutral-primary-soft border border-default rounded-xl shadow-sm  flex flex-col ">

                            <Link to="/item">
                       
                            <img
                                className="w-full h-80 object-cover rounded-lg mb-4"
                                src={food.imageUrl}
                                alt={food.name}
                              
                            /></Link>
                       


                        <div className="flex flex-col grow p-2">
                            <h5 className="text-lg font-semibold text-heading">
                                {food.name}
                            </h5>

                            <div>
                             <h5 className="text-lg text-heading">
                                {food.description}
                            </h5>

                            </div>
                           

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-bold text-heading">
                                    ₹{food.price}
                                </span>

                                <button
                                    type="button"
                                    className=" text-white text-sm px-3 py-2  bg-blue-400 rou">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>


                )
            })}
           
        </div>

    )
}

export default FoodCard