import axios from "axios";
const BASE_URL = 'http://localhost:8080/v1/api'
const userInfo = JSON.parse(localStorage.getItem("chat_app"))
const token = userInfo?.token

export const registerUser = async (data) => {
    const formData = await axios.post(`${BASE_URL}/user/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return formData?.data;
}

export const loginUser = async (data) => {
    const formData = await axios.post(`${BASE_URL}/user/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return formData?.data;
}

export const getUserBySearch = async (search) => {
    const formData = await axios.get(`${BASE_URL}/user/getUser?search=${search}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    })
    return formData?.data;
}
