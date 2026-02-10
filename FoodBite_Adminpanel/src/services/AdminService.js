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

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append("file", image)
    formData.append("food", JSON.stringify(foodData))

    try {
        const res = await axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return res.data

    } catch (error) {
        console.error("Error occurred while adding food data: ", error)
        throw error;

    }
}


export const updateFoodData = async (foodId, foodVal) => {
    try {
       return await axios.put(API_URL + "/" + foodId, foodVal, { headers: { "Content-Type": "application/json" } })
        
    } catch (error) {
        console.error("Error occurred while updating food data")
        throw error;
    }
}

export const deleteData = async (foodId) => {
    try {
        const res = await axios.delete(API_URL + "/" + foodId)
        return res.data;

    } catch (error) {
        console.error("Error occur while deleting food data: ", error)
        throw error
    }
}