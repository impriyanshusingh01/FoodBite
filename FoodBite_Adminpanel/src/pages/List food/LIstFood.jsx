import React, { useEffect, useState } from 'react'
import './ListFood.css'
import axios from "axios";
import { deleteData, getAllFood } from '../../services/AdminService';
import { toast } from 'react-toastify';
import UpdateFood from '../Update food/UpdateFood';

const LIstFood = () => {
  const [dataFood, setDataFood] = useState(null)
  const [data, setData] = useState([])
  const [showForm, setShowForm] = useState(false)

  const getAllFoodData = async () => {
    try {
      const foodData = await getAllFood()
      setData(foodData)
    } catch (error) {
      toast.error("Error while fetching food data")

    }
  }

  const deleteFoodById = async (foodId) => {
    try {
      await deleteData(foodId)
      toast.success("Delete sucessfully")
      await getAllFoodData();
    } catch (error) {
      toast.error("Not delete successfully")
      console.log(error)
    }
  }

  useEffect(() => {
    getAllFoodData()
  }, [])

  return (
    <div className=''>

      <div className='relative z-0 min-h-screen'>
        <table className={'w-full text-center' + (showForm ? 'opacity-40 ' : "")}>
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
                  <td><button className='px-2' onClick={() => deleteFoodById(food.id)}>Delete</button>
                    <button onClick={() => {
                      console.log("Edit clicked")
                      setDataFood(food)
                      setShowForm(true)
                    }}>Edit</button></td>
                </tr>

              )
            })}

          </tbody>
        </table>

        {showForm && (
          <div className='updateform absolute  z-50 flex items-center justify-center w-full top-0 h-full'>
            {showForm && (<UpdateFood onclose={() => setShowForm(false)} foodDataPass={dataFood} listRefresh={getAllFoodData} />)}

          </div>
        )}

      </div>
    </div>

  )
}

export default LIstFood

