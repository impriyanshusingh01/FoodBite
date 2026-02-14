import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { foodById } from '../../service/foodBite';
import { toast } from 'react-toastify';

const FoodItem = () => {
    const { id } = useParams();
    const [dataById, setDataById] = useState({})
    const fetchFoodById = async (id) => {
        try {
            const foodData = await foodById(id)
            setDataById(foodData)
        } catch (error) {
            toast.error("Not successfully fetch food by id")
        }

    }

    useEffect(() => {
        fetchFoodById(id);
    }, [id])

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={dataById.imageUrl} alt="..." /></div>
                    <div className="col-md-6">
                      
                        <h1 className="display-5 fw-bolder">{dataById.name}</h1>
                        <div className="fs-5 mb-5">
                            
                            <span>&#8377;{dataById.price}</span>
                        </div>
                        <p className="lead">{dataById.description}</p>
                        <div className="d-flex">
                           
                            <button className="btn btn-outline-dark shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FoodItem