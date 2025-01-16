import React, { useEffect, useState } from 'react'
import { fetchChats } from '../../services/chatsApi'
import Loader from '../loader/Loader'

function ChatPage() {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const data = fetchChats()
        setChats(data)
    }, [])

    return (
        <div>
            <Loader />
        </div>
    )
}

export default ChatPage