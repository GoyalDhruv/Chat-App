import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import MyChats from '../Chats/MyChats'
import ChatBox from '../Chats/ChatBox'
import Box from '@mui/material/Box';
import NavBar from '../Chats/Navbar'

function ChatPage() {
    const { user } = ChatState()

    const [fetchAgain, setFetchAgain] = useState(false)

    return (
        <>
            {user &&
                <>
                    <header className='w-screen'>
                        <NavBar />
                    </header>
                    <Box className='flex p-[10px] h-[650px]'>
                        <MyChats fetchAgain={fetchAgain} />
                        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    </Box>
                </>
            }
            {/* <Loader /> */}
        </>
    )
}

export default ChatPage