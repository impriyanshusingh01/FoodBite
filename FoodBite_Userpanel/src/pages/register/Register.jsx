import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../service/authFoodBiteService';

const Register = () => {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegister(register => ({ ...register, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(register)
            toast.success("Sign up successfully")
            setRegister({ name: "", email: "", password: "" })
            navigate("/login")
        } catch (error) {
            toast.error("Not Registered succeffully")
        }

    }

    return (

        <form onSubmit={onSubmitHandler} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
                <input type="text" id="name" name='name' className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="John" required value={register.name} onChange={changeHandler} />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                <input type="email" id="email" name='email' className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" required value={register.email} onChange={changeHandler} />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                <input type="password" id="password" name='password' className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" required value={register.password} onChange={changeHandler} />
            </div>
            <label htmlFor="remember" className="flex items-center mb-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" required />
                <p className="ms-2 text-sm font-medium text-heading select-none">I agree with the <a href="#" className="text-fg-brand hover:underline">terms and conditions</a>.</p>
            </label>
            <button type="submit" className="text-white bg-blue-400 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
        </form>

    )
}

export default Register