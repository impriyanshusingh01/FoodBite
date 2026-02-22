import axios from "axios";

const Api_Url= import.meta.env.VITE_ORDER_API_URL;

export const  getFoodOrder = async() => {
    try {
       const res = await axios.get(Api_Url+"/admin");
       return res.data;
    } catch (error) {
        console.log("Error Occured While Fetching OrderList: ",error)
        throw error;
    }
}