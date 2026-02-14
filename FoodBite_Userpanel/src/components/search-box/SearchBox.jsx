import React from 'react'
import './searchButton.css'

const SearchBox = ({setCategoryPass, setSearchTextCategory}) => {
    return (
        <form className="max-w-2xl mx-auto p-3">
            <div className="flex shadow-xs ">

                <div className="relative flex items-center">

            
                    <i className="bi bi-tags absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>

                   
                    <select
                        className=" pl-10 pr-6 py-3 rounded-lg bg-gray-200 outline-none"  onChange={(e) => setCategoryPass(e.target.value)}>
                        <option>All</option>
                        <option>Biryani</option>
                        <option>Burger</option>
                        <option>Pizza</option>
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
                    className="search-btn inline-flex items-center text-white bg-blue-500 
                 hover:bg-blue-600  text-sm px-3 py-2.5">
                   <i className="bi bi-search mx-2"></i>
                    Search
                </button>

            </div>
        </form>


    )
}

export default SearchBox