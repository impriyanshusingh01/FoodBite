import React, { useEffect, useState } from 'react'
import './ListFood.css'
import axios from "axios";
import { getAllFood } from '../../services/AdminService';
import { toast } from 'react-toastify';

const LIstFood = () => {

  const [data, setData] = useState([])

  const getAllFoodData = async () => {
    try {
      const foodData = await getAllFood()
      setData(foodData)
    } catch (error) {
      toast.error("Error while fetching food data")
     
    }
  }

  const deleteFoodById = async() => {
    const foodDelete = await axios.delete("http://localhost:8080/foodBite/")
  }

  useEffect(() => {
    getAllFoodData()
  }, [])

  return (
    <div className=''>

      <table className='w-full text-center'>
        <thead>
          <tr className='border border-gray-400'>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>


        <tbody>
          {data.map(food => {
            return (
              <tr className='border border-gray-400 text-center' key={food.id}>
                <td className='flex justify-center'><img src={food.imageUrl} alt="" width={65} height={65} /></td>
                <td>{food.name}</td>
                <td>{food.price}</td>
                <td>{food.category}</td>
                <td>{food.description}</td>
                <td><button >Delete</button></td>
              </tr>
              
            )
          })}

        </tbody>

      </table>
    </div>

  )
}

export default LIstFood

