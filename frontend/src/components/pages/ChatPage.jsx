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
                <>
                    <header className='w-screen'>
                        <NavBar />
                    </header>
                    <Box className='flex p-[10px] h-[650px]'>
                        <MyChats />
                        <ChatBox />
                    </Box>
                </>
            }
            {/* <Loader /> */}
        </>
    )
}

export default ChatPage