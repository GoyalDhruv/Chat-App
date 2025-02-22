import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import toast from 'react-hot-toast';
import { fetchChats } from '../../services/chatsApi';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SkeletonLoader from '../loader/SkeletonLoader';
import { Stack } from '@mui/material';
import GroupChatModal from './GroupChatModal';
import { getSender } from '../../utils/utils';

function MyChats({ fetchAgain }) {

    const [loggedUser, setLoggedUser] = useState()
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const fetchChat = async () => {
        try {
            const { data } = await fetchChats(loggedUser);
            setChats(data);
        } catch (error) {
            toast.error("Error in fetching the chat");
            console.error(error);
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("chat_app")))
    }, [fetchAgain])

    useEffect(() => {
        if (loggedUser) {
            fetchChat()
        }
    }, [loggedUser, fetchAgain])

    return (
        <Box
            sx={{
                display: { xs: selectedChat ? "none" : "flex", md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: 'white',
                width: { xs: '100%', md: '31%' },
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'grey.200',
            }}
        >
            <Box className='pb-3 px-3 text-2xl grid grid-cols-12 w-full'>
                <span className='col-span-12 xl:col-span-6'>My Chats</span>
                <GroupChatModal>
                    <Button className='w-100' variant='contained'>New Group Chat</Button>
                </GroupChatModal>
            </Box>
            <Box className='flex flex-col p-3 bg-[#F8F8F8] w-100 h-100 rounded-lg overflow-y-hidden'>
                {chats ?
                    <Stack className='overflow-y-scroll scrollbar-hide '>
                        {chats.map(chat => (
                            <Box key={chat._id} className={`${selectedChat === chat ? "bg-[#38B2AC] white" : "bg-[#E8E8E8] white"} py-2 px-3 my-1 rounded-lg cursor-pointer`} onClick={() => setSelectedChat(chat)}>
                                <span className='capitalize'>
                                    {!chat?.isGroupChat ?
                                        getSender(loggedUser, chat?.users)
                                        : chat?.chatName}
                                </span>
                                {/* <div className='flex items-center'>
                                    <img src={chat.user.pic} alt={chat.user.name} className='rounded-full w-10 h-10' />
                                    <p className='ml-2'>{chat.user.name}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>{chat.lastMessage}</p>
                                    <p>{chat.lastMessageTime}</p>
                                </div> */}
                            </Box>
                        ))}
                    </Stack>
                    :
                    <SkeletonLoader number={8} />
                }
            </Box>
        </Box>
    )
}

export default MyChats