import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { updateFoodData } from '../../services/AdminService';

const UpdateFood = ({ onclose, foodDataPass, listRefresh }) => {
    const [foodVal, setFoodVal] = useState({
        "name": "",
        "price": "",
        "category": "",
        "description": ""
    });


    const onchangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFoodVal(foodVal => ({ ...foodVal, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (foodDataPass) {
                const foodId = foodDataPass.id;
                await updateFoodData(foodId, foodVal)
                toast.success("update successfully food data")

            }

            await listRefresh();
            onclose();

        } catch (error) {
            toast.error("Not update successfully food data")
        }
    }

    useEffect(() => {
        if (foodDataPass) {
            setFoodVal({
                "name": foodDataPass.name,
                "price": foodDataPass.price,
                "category": foodDataPass.category,
                "description": foodDataPass.description
            })
        }
    }, [foodDataPass])

    return (
        <div>
            <section className="">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update new Product</h2>

                    <form onSubmit={onSubmitHandler}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">


                            <div className="foodname  sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" value={foodVal.name} onChange={onchangeHandler} />
                            </div>

                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" value={foodVal.price} onChange={onchangeHandler} />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name='category' value={foodVal.category} onChange={onchangeHandler} >

                                    <option value="Biryani">Biryani</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Cake">Cake</option>
                                    <option value="rolls">Rolls</option>
                                    <option value="rolls">Ice Cream</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" name='description' rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" value={foodVal.description} onChange={onchangeHandler} ></textarea>
                            </div>
                        </div>
                        <button type="submit" className="inline-flex text-amber-600 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" >
                            Update Product
                        </button>
                        <button type="button" className="inline-flex text-amber-600 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={onclose}>
                            Close
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default UpdateFood