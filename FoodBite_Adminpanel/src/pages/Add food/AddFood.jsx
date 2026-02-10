import React, { useState } from 'react'
import { assets } from '../../assets/Assets'
import './AddFod.css'
import { toast } from 'react-toastify'
import { addFood } from '../../services/AdminService'


const AddFood = () => {
    const [image, setImage] = useState(false)
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        category: "",
        description: ""
    })

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFoodData(foodData => ({ ...foodData, [name]: value }))
    }

    const submitHandler = async(e) => {
        e.preventDefault()

        if (!image) {
            return toast.error("Please select a image")
        }
        
        try {
            await addFood(foodData, image)
            toast.success("Food successfully added")
            setFoodData({name: "", price: "", category: "Biryani", description: ""})
            setImage(null)
        } catch (error) {
            toast.error("Something happen while adding food")
        }

    }




    return (
        <div>
            <section className="">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                            <div className="sm:col-span-2">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={90} height={90} /></label>
                                <input type="file" hidden id='image' name='image' onChange={(e) => setImage(e.target.files[0])} />
                            </div>

                            <div className="foodname  sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" value={foodData.name} onChange={changeHandler}/>
                            </div>

                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" value={foodData.price} onChange={changeHandler}/>
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name='category' value={foodData.category} onChange={changeHandler}>
                                   
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
                                <textarea id="description" name='description' rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" value={foodData.description} onChange={changeHandler}></textarea>
                            </div>
                        </div>
                        <button type="submit" className="inline-flex text-amber-600 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" >
                            Add product
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AddFood