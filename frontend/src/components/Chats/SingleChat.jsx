import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Box, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSender, getSenderFull } from '../../utils/utils';
import ProfileModal from './ProfileModal';
import UpdateModalChat from './UpdateModalChat';

function SingleChat({ fetchAgain, setFetchAgain }) {

    const { user, selectedChat, setSelectedChat } = ChatState();

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
                                    <UpdateModalChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                                </> :
                                <>
                                    {getSender(user, selectedChat?.users)}
                                    <ProfileModal user={getSenderFull(user, selectedChat?.users)} />
                                </>
                            }
                        </div>
                    </div>
                    <Box className="flex flex-col justify-end p-3 w-full h-full rounded-lg overflow-y-hidden bg-[#E8E8E8]">

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