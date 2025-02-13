import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, TextField } from '@mui/material'
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getUserBySearch } from '../../services/userApi';
import SkeletonLoader from '../loader/SkeletonLoader';
import { accessChats } from '../../services/chatsApi';
import { ChatState } from '../../context/ChatProvider';

function SideDrawer({ open, onClose, search, setSearch, users, setUsers }) {
    const { user, setSelectedChat, chats, setChats } = ChatState()
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!search) {
            toast.error('Please enter something in search');
            return;
        }
        try {
            setLoading(true);
            const { data } = await getUserBySearch(search);
            setUsers(data)
        } catch (error) {
            toast.error("Failed to load the search results")
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const accessChat = async (userId) => {
        try {
            const existingChat = chats?.filter(chat => chat?.isGroupChat == false)?.find(c =>
                c.users.some(existingUser => existingUser._id === user?.id) &&
                c.users.some(existingUser => existingUser._id === userId)
            );

            if (existingChat) {
                setSelectedChat(existingChat);
                onClose();
                return;
            }
            const { data } = await accessChats(userId);
            if (!chats?.find(c => c.id === data?._id)) {
                setChats([data, ...chats])
            }

            setSelectedChat(data);
            onClose();
        } catch (error) {
            toast.error("Error in fetching the chat");
            console.error(error);
        }
    }

    return (
        <Drawer open={open} onClose={onClose}>
            <Box sx={{ width: 300, p: 2 }} role="presentation">
                <h3 className='mb-3'>Search Users</h3>
                <div className='flex gap-1'>
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Search by Name or Email"
                        className=''
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSearch}>Go</Button>
                </div>
                <List className='mt-1'>
                    {loading ?
                        <SkeletonLoader number={13} />
                        :
                        users?.map((user) => (
                            <ListItem key={user._id} className='p-0 border rounded-lg bg-gray-200 my-1'>
                                <ListItemButton onClick={() => accessChat(user._id)}>
                                    <ListItemIcon>
                                        <span className='capitalize'><img src={user?.pic} alt={user?.name} className='size-10 rounded-full' /></span>
                                    </ListItemIcon>
                                    <ListItemText primary={user?.name} secondary={user?.email} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}

export default SideDrawer