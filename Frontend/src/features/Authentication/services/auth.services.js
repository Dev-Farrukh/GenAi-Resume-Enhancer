import axios from "axios";

const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials: true
})

export const registerUser = async ({username , email , password}) => {
    try {
        const response = await axiosClient.post(`/auth/register` , {
            username, email, password 
        });
        return response.data;
    } catch (error) {
        console.log("Error registering user" , error);
        
    }
}

export const loginUser = async ({email , password}) => {
    try {
        const response = await axiosClient.post(`/auth/login` , {
            email, password
        });
        return response.data;
    } catch (error) {
        console.log("Error logging in user" , error);
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosClient.get(`/auth/logout`); 
        return response.data;
    } catch (error) {
        console.log("Error logging out user" , error);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axiosClient.get(`/auth/me`);
        return response.data;
    }catch (error) {
        console.log("Error fetching current user" , error);
    }
}