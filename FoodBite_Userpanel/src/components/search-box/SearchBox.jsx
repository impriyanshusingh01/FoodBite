import React from 'react'
import './searchButton.css'

const SearchBox = ({setCategoryPass, setSearchTextCategory}) => {
    return (
        <form className="max-w-2xl mx-auto p-3">
            <div className="flex shadow-xs ">

                <div className="relative flex items-center">

            
                    <i className="bi bi-tags absolute left-3 top-1/2 -translate-y-1/2 text-white"></i>

                   
                    <select
                        className=" pl-10 pr-6 py-3 rounded-lg  outline-none cursor-pointer   text-white text-sm  bg-orange-500 hover:bg-orange-600 transition duration-200"  onChange={(e) => setCategoryPass(e.target.value)}>
                        <option>All</option>
                        <option>Biryani</option>
                        <option>Burger</option>
                        <option>Pizza</option>
                        <option>Rolls</option>
                        <option>Cake</option>
                        <option>Ice Cream</option>
                    </select>

                </div>



                <input
                    type="search"
                    id="search-dropdown"
                    className="px-3 py-2.5 border border-gray-300 text-gray-900 text-sm 
                 focus:ring-primary-500 focus:border-primary-500 block w-full"
                    placeholder="Search for foods..."
                    required onChange={(e) => setSearchTextCategory(e.target.value)} />


                <button
                    type="button"
                    className="text-white text-sm px-3 py-2 bg-orange-500 hover:bg-orange-600 transition duration-200 ">
                   <i className="bi bi-search mx-2"></i>
                   
                </button>

            </div>
        </form>


    )
}

export default SearchBox