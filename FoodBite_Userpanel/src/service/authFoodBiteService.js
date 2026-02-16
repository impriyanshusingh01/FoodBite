import axios from "axios";

const Api_Url = "http://localhost:8080/foodBite/auth";

export const registerUser = async (register) => {
    try {
        const res = await axios.post(Api_Url+"/signup", register)
        return res.data
    } catch (error) {
        console.error("Error while resgister user: ",error)
        throw error;
    }
}

export const loginUser = async (loginData) => {
    
    try {
        const res = await axios.post(Api_Url+"/login",loginData)
        return res.data;
    } catch (error) {
        console.error("Error while login user: ",error)
        throw error;
    }
}