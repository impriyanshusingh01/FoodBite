import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const  CartContext = createContext();

export const CartProvider = ({children}) => {
  const token = localStorage.getItem('token')

  const[countCart, setCountCart] = useState(0);

  const fetchCartList = async () => {
    const res = await axios.get("http://localhost:8080/cart", {headers: {Authorization: `Bearer ${token}`}})
  
    let cartQuant = 0;
    res.data?.forEach(item => {
      cartQuant += item.quantity;
    })
    setCountCart(cartQuant)
    
  }

  useEffect(() => {
    fetchCartList()
  }, [])

  return(
      <CartContext.Provider value={{countCart, fetchCartList}}>
        {children}
      </CartContext.Provider>
  );
};