import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("chat_app"))

        setUser(userInfo)

        if (!userInfo) {
            navigate('/')
        }
    }, [navigate])

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}
ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const ChatState = () => {
    return useContext(ChatContext);
};
export default ChatProvider