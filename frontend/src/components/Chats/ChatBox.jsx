import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import Box from '@mui/material/Box';
import SingleChat from './SingleChat';

function ChatBox({ fetchAgain, setFetchAgain }) {
    const { selectedChat } = ChatState();
    return (
        <Box
            sx={{
                display: { xs: selectedChat ? "flex" : "none", md: "flex" },
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: 'white',
                width: { xs: '100%', md: '68%' },
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'grey.200',
            }}
        ><SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></Box>
    )
}

export default ChatBox