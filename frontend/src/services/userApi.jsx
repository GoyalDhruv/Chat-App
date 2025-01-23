import axios from "axios";
const BASE_URL = 'http://localhost:8080'

export const registerUser = async (data) => {
    const formData = await axios.post(`${BASE_URL}/v1/api/user/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return formData?.data;
}

export const loginUser = async (data) => {
    const formData = await axios.post(`${BASE_URL}/v1/api/user/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return formData?.data;
}

