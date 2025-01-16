import React, { useEffect, useState } from 'react'
import { fetchChats } from '../../services/chatsApi'

function ChatPage() {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const data = fetchChats()
        setChats(data)
    }, [])

    return (
        <div>ChatPage</div>
    )
}

export default ChatPage