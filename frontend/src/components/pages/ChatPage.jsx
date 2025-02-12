import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import MyChats from '../Chats/MyChats'
import ChatBox from '../Chats/ChatBox'
import Box from '@mui/material/Box';
import NavBar from '../Chats/Navbar'
// import { fetchChats } from '../../services/chatsApi'
// import Loader from '../loader/Loader'

function ChatPage() {
    const { user } = ChatState()
    const [chats, setChats] = useState([])


    // useEffect(() => {
    //     const data = fetchChats()
    //     setChats(data)
    // }, [])

    return (
        <>
            {user &&
                <div>
                    <header className='w-screen'>
                        <NavBar />
                    </header>
                    <Box className=''>
                        <MyChats />
                        <ChatBox />
                    </Box>
                </div>
            }
            {/* <Loader /> */}
        </>
    )
}

export default ChatPage