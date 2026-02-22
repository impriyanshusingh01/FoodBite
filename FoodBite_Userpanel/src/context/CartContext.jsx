import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getCartContext } from "../service/cartService";

export const  CartContext = createContext();

export const CartProvider = ({children}) => {
 

  const[countCart, setCountCart] = useState(0);

  const fetchCartList = async () => {
    const res = await getCartContext();
  
    let cartQuant = 0;
    res?.forEach(item => {
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