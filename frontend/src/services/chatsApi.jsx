import axios from 'axios'
const BASE_URL = 'http://localhost:8080/v1/api'
const userInfo = JSON.parse(localStorage.getItem("chat_app"))
const token = userInfo?.token


export const accessChats = async (id) => {
    try {
        const formData = await axios.post(`${BASE_URL}/chat`, {
            userId: id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            });
        return formData?.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchChats = async () => {
    try {
        const formData = await axios.get(`${BASE_URL}/chat`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            });
        return formData?.data;
    } catch (error) {
        console.error(error);
    }
}