import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { CartContext } from '../../context/CartContext'

const Navbar = ({ isLogin, setLogin }) => {

    const {countCart} = useContext(CartContext)

    const [openMenu, setOpenMenu] = useState(false)

    const logout = () => {
        localStorage.removeItem("token")
        setLogin(false)
        setOpenMenu(false)
    }



    return (

        <div className='sticky top-0'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#!">Start Bootstrap</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

                    <ul className="navbar-nav flex-row gap-3 me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/explore">Explore</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact us</Link></li>

                    </ul>
                    <form className="d-flex gap-20">
                        <Link to="/cart" className="btn btn-outline-dark" type="submit">
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{countCart}</span>
                        </Link>

                        <ul className="navbar-nav flex-row gap-3 me-auto mb-2 mb-lg-0 ms-lg-4">
                            {isLogin ? (
                                <div className='relative'>
                                    <img src={assets.profile} alt=""  width={30} height={30} onClick={() => setOpenMenu(prev => !prev)}/>
                               {openMenu && (
                                 <div className='absolute z-50  border bg-white top-9 '>

                                    <button className="nav-item  text-amber-50"><Link className="nav-link" to='/' onClick={logout}>Logout</Link></button>
                                    <button className="nav-item  text-amber-50"><Link className="nav-link" to='/Order/history'>Orders</Link></button>
                                    
                                </div>
                               )}
                                </div>
                            ) : (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/register">Sign up</Link></li>
                                </>
                            )}
                        </ul>

                    </form>

                </div>
            </nav>
        </div>


    )
}

export default Navbar



