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

export const foodById = async (id) => {
    try {
        const response = await axios.get(Api_Url+"/"+id)
        return response.data;
    } catch (error) {
        console.error("Error while fetching food by id: ",error)
        throw error;
    }
}