import axios from "axios";

const Api_Url = import.meta.env.VITE_CART_API_URL;
const token = localStorage.getItem('token')

export const calculateCartDta = async () => {
    try {
        const res = await axios.get(Api_Url + "/calculate", { headers: { Authorization: `Bearer ${token}` } })
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const updataCartDta = async (cartItemId, qty) => {
    try {
        const res = await axios.patch(Api_Url + "/" + cartItemId, { quantity: qty }, { headers: { Authorization: `Bearer ${token}` } })
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const deleteCart = async (cartItemId) => {
    try {
        const res = await axios.delete(Api_Url + "/" + cartItemId, { headers: { Authorization: `Bearer ${token}` } })
        return res.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getCartContext = async () => {
    try {
        const res = await axios.get("http://localhost:8080/cart", { headers: { Authorization: `Bearer ${token}` } })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const addCart = async (foodId) => {
    try {
        const res = await axios.post(`http://localhost:8080/cart/${foodId}`, { quantity: 1 }, { headers: { Authorization: `Bearer ${token}` } })
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}