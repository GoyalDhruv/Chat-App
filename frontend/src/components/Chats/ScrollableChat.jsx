import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../utils/utils'
import { ChatState } from '../../context/ChatProvider'
import { Tooltip } from '@mui/material';
import CustomAvatar from './CustomAvatar';

function ScrollableChat({ messages }) {

    const { user } = ChatState();

    return (
        <>
            <ScrollableFeed>
                {messages && messages?.map((m, i) => (
                    <div key={i} className='flex'>
                        {(isSameSender(messages, m, i, user?.id) || isLastMessage(messages, i, user?.id)) &&
                            <Tooltip title={m.sender.name} placement='bottom'>
                                <span className='mt-2 me-1'>
                                    <CustomAvatar name={m.sender.name} />
                                </span>
                            </Tooltip>
                        }
                        <span
                            className={`${m.sender._id === user?.id ? "bg-[#BEE3F8]" : "bg-[#B9F5D0]"} rounded-3xl p-[.75rem] max-w-[75%]`}
                            style={{
                                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
            </ScrollableFeed>
        </>
    )
}

export default ScrollableChat