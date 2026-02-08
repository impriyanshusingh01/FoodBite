import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
 

          <div>
              <div className="border-end bg-yellow-200" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
                <div className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to={"/add"}>Add Food</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">List Food</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/order">Order</Link>
                  
                </div>
            </div>
          </div>
      
    )
}

export default Sidebar