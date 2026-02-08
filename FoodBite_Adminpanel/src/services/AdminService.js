import axios from "axios";
const API_URL = "http://localhost:8080/foodBite"
export const getAllFood = async () => {
    try {
        const response = await axios.get(API_URL)

        if (response.status == 200) {
            return response.data
        } else {
            throw new Error("Error occurred while fetch foods")
        }
    } catch (error) {
        console.error("Error occurred while fetch foods: ", error)
        throw error;
    }
}