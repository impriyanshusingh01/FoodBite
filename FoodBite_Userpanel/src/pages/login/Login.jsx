import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/authFoodBiteService';
import './Login.css'

const Login = ({setLogin}) => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData(loginData => ({...loginData, [name]: value}))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(loginData)
            
            localStorage.setItem("token", data.token)
            setLoginData({ email: "", password: "" })
            toast.success("You login successfully")
            setLogin(true)
            navigate("/")
          
        } catch (error) {
            toast.error("Not successfully login")
            console.log(error)
        }
    }

    return (
        <div className='flex-box flex justify-center items-center min-h-[90vh]'>
        <form onSubmit={onSubmitHandler} className="border-form max-w-sm mx-auto p-4 w-xl ">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
               <input type="email" id="email" name='email' className="border-form outline-red-400  bg-neutral-secondary-medium  text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" required value={loginData.email} onChange={onChangeHandler} />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                  <input type="password" id="password" name='password' className="border-form outline-red-400  bg-neutral-secondary-medium  text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="********" required value={loginData.password} onChange={onChangeHandler} />
            </div>

            <div className='flex gap-2  mb-4'>
                <input type="checkbox" required/> <span>Terms and condition</span>
            </div>

            <div className='flex justify-center'>

            <button type="submit" className="text-white text-sm px-3 py-2 bg-orange-500 hover:bg-orange-600 transition duration-200">Sign In</button>
            </div>
        </form>
        </div>
    )
}

export default Login