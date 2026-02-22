import axios from "axios";

const Api_Url = import.meta.env.VITE_ORDER_API_URL;
const token = localStorage.getItem('token')

export const placeOrder = async (address) => {
    try {
        const res = await axios.post(Api_Url, address, { headers: { Authorization: `Bearer ${token}` } })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}


export const orderList = async () => {
    try {
        const res = await axios.get(Api_Url, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}