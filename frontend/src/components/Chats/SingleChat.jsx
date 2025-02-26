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
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import AnimationData from '../../animations/typing.json'

const ENDPOINT = 'http://localhost:8080';
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: AnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', user);
        socket.on('connected', () => {
            console.log("Connected to the server");
            setSocketConnected(true);
        });
        socket.on('typing', () => {
            setIsTyping(true);
        })

        socket.on('stopped typing', () => {
            setIsTyping(false);
        })

    }, [])

    const fetchMessages = async () => {
        if (!selectedChat) return;
        setLoading(true);
        try {
            const { data } = await getAllMessages(selectedChat._id);
            setMessages(data);

            socket.emit('join chat', selectedChat?._id)
        } catch (error) {
            toast.error("Failed to load the messages");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        socket.on('message received', (message) => {
            if (!selectedChatCompare || selectedChatCompare._id !== message?.chat?._id) {
                // give notification
            }
            else {
                setMessages([...messages, message])
            }
        })
    })

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            socket.emit("stopped typing", selectedChat?._id)
            try {
                setNewMessage("");
                const formData = {
                    chatId: selectedChat._id,
                    content: newMessage,
                }
                const { data } = await sendNewMessage(formData);
                socket.emit('new message', data)
                setMessages([...messages, data]);
            } catch (error) {
                toast.error("Failed to send the message");
                console.error(error);
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        if (!socketConnected) return;
        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat?._id);
        }

        let lastTypingTime = new Date().getTime();
        setTimeout(() => {
            let timeNow = new Date().getTime()
            let timeDiff = timeNow - lastTypingTime
            if (timeDiff >= 3000 && typing) {
                socket.emit('stopped typing', selectedChat?._id);
                setTyping(false);
            }
        }, 3000)
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
                                    {isTyping &&
                                        <Lottie
                                            options={defaultOptions}
                                            width={70}
                                            style={{ marginBottom: 10, marginLeft: 0 }}
                                        />
                                    }
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