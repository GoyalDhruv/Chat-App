import axios from "axios";
const BASE_URL = 'http://localhost:8080/v1/api'
const userInfo = JSON.parse(localStorage.getItem("chat_app"))
const token = userInfo?.token


export const sendNewMessage = async (data) => {
    const formData = await axios.post(`${BASE_URL}/messages`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    })
    return formData?.data;
}

export const getAllMessages = async (id) => {
    const formData = await axios.get(`${BASE_URL}/messages/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    })
    return formData?.data;
}
