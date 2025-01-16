import axios from 'axios'
const BASE_URL = 'http://localhost:5000'

export const fetchChats = async () => {
    try {
        const data = await axios.get(`${BASE_URL}/`);
        return data?.data;
    } catch (error) {
        console.error(error);
    }
}