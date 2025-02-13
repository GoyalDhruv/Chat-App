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

export const fetchChats = async (loggedUser) => {
    try {
        const formData = await axios.get(`${BASE_URL}/chat`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${loggedUser?.token}`
                }
            });
        return formData?.data;
    } catch (error) {
        console.error(error);
    }
}

export const createGroupChat = async (data) => {
    try {
        const formData = await axios.post(`${BASE_URL}/chat/group`, data,
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

export const renameGroupChat = async (data) => {
    try {
        const formData = await axios.patch(`${BASE_URL}/chat/renameGroup`, data,
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

export const addNewUserToGroupChat = async (data) => {
    try {
        const formData = await axios.patch(`${BASE_URL}/chat/addUserToGroup`, data,
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

export const removeUserFromGroupChat = async (data) => {
    try {
        const formData = await axios.patch(`${BASE_URL}/chat/removeUserFromGroup`, data,
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