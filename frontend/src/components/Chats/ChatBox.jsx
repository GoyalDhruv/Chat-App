import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import Box from '@mui/material/Box';

function ChatBox() {
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
        >Chat Box</Box>
    )
}

export default ChatBox