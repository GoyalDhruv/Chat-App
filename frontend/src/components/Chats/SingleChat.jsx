import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Box, FormControl, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSender, getSenderFull } from '../../utils/utils';
import ProfileModal from './ProfileModal';
import UpdateModalChat from './UpdateModalChat';
import Loader from '../loader/Loader'
import toast from 'react-hot-toast';
import { getAllMessages, sendNewMessage } from '../../services/messageApi';
import ScrollableChat from './ScrollableChat';

function SingleChat({ fetchAgain, setFetchAgain }) {

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        if (!selectedChat) return;
        setLoading(true);
        try {
            const { data } = await getAllMessages(selectedChat._id);
            setMessages(data);
        } catch (error) {
            toast.error("Failed to load the messages");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [selectedChat])

    console.log(messages)

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                setNewMessage("");
                const formData = {
                    chatId: selectedChat._id,
                    content: newMessage,
                }
                const { data } = await sendNewMessage(formData);
                setMessages([...messages, data]);
            } catch (error) {
                toast.error("Failed to send the message");
                console.error(error);
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    return (
        <>
            {selectedChat ?
                <>
                    <div className='text-xl pb-3 m-0 px-3 flex justify-between items-center w-100'>
                        <div className='flex lg:hidden'>
                            <IconButton edge="start" color="inherit" onClick={() => setSelectedChat("")}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <div className='capitalize w-100 flex justify-between pt-1'>
                            {selectedChat?.isGroupChat ?
                                <>
                                    {selectedChat?.chatName}
                                    <UpdateModalChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                                </> :
                                <>
                                    {getSender(user, selectedChat?.users)}
                                    <ProfileModal user={getSenderFull(user, selectedChat?.users)} />
                                </>
                            }
                        </div>
                    </div>
                    <Box className="flex flex-col justify-end p-3 w-full h-full rounded-lg overflow-y-hidden bg-[#E8E8E8]">
                        {loading ?
                            <Loader /> :
                            <>
                                <div className='messages'>
                                    <ScrollableChat messages={messages} />
                                </div>
                                <FormControl onKeyDown={sendMessage}>
                                    <input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={typingHandler}
                                        className='bg-[#dedede] p-2 rounded-lg border'
                                    />
                                </FormControl>
                            </>
                        }
                    </Box>
                </>
                :
                <Box className='flex items-center justify-center h-full'>
                    <p className='m-0 text-3xl'> Click on a user to start chatting</p>
                </Box>
            }
        </>
    )
}

export default SingleChat