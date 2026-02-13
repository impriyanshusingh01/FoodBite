import axios from "axios";


const Api_Url = "http://localhost:8080/foodBite";

export const foodDataList = async () => {
    try {
        const response = await axios.get(Api_Url)
        return response.data
    } catch (error) {
        console.error("Error ocurred while fetching food data: ", error)
        throw error;
    }
} 