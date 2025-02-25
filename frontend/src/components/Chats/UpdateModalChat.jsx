import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ChatState } from '../../context/ChatProvider';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { addNewUserToGroupChat, removeUserFromGroupChat, renameGroupChat } from '../../services/chatsApi';
import { getUserBySearch } from '../../services/userApi';
import SkeletonLoader from '../loader/SkeletonLoader';

function UpdateModalChat({ fetchAgain, setFetchAgain, fetchMessages }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (newUser, leave = false) => {
        let USERID = ""
        if (!leave) {
            USERID = newUser._id
        }
        else {
            USERID = newUser.id
        }

        if (selectedChat?.groupAdmin?._id === (USERID)) {
            toast.error('Admin can not leave group chat');
            return;
        }

        if (selectedChat?.groupAdmin?._id != user?.id && USERID !== user?.id) {
            toast.error('Only admins can remove the user');
            return;
        }

        try {
            const formData = {
                chatId: selectedChat._id,
                userId: USERID
            }
            const { data } = await removeUserFromGroupChat(formData);
            toast.success('User removed successfully');
            USERID === user?.id ? setSelectedChat("") : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages()
            handleClose();
        } catch (error) {
            toast.error("Error in removing the user");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleRename = async () => {
        if (!groupChatName) {
            toast.error('Please enter a Group chat name');
            return;
        }

        try {
            const formData = {
                chatId: selectedChat._id,
                chatName: groupChatName
            }
            const { data } = await renameGroupChat(formData);
            toast.success('Group chat name updated successfully');
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            toast.error('Failed to update group chat name');
            console.error(error);
        }

        setGroupChatName("");
    }

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            setSearchResults([]);
            return;
        }

        try {
            setLoading(true)
            const { data } = await getUserBySearch(query);
            setSearchResults(data)
        } catch (error) {
            toast.error("Error in search the users");
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const handleAddUser = async (newUser) => {
        if (selectedChat?.users?.find((u) => u._id === newUser._id)) {
            toast.error("User already in the group");
            return;
        }

        if (selectedChat?.groupAdmin?._id !== user.id) {
            toast.error("Only the group admin can add users");
            return;
        }

        try {
            setLoading(true)
            const formData = {
                chatId: selectedChat._id,
                userId: newUser._id
            }
            const { data } = await addNewUserToGroupChat(formData);
            toast.success("User added to the group successfully");
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            toast.error("Error in adding user to the group");
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <IconButton onClick={handleClickOpen}><VisibilityIcon /></IconButton>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2, pb: 0, fontSize: '25px' }} id="customized-dialog-title">
                    {selectedChat?.chatName}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 10,
                        top: 13,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Box>
                        <Box className='w-full flex flex-wrap'>
                            {selectedChat?.users?.map((user) => (
                                <span key={user._id} className='px-2 py-1 rounded-lg m-1 mb-2 text-sm cursor-pointer bg-blue-700 text-white flex items-center'>
                                    <span>{user.name}</span>
                                    <CloseIcon fontSize='small' onClick={() => handleDelete(user)} />
                                </span>
                            ))
                            }
                        </Box>
                        <FormControl className='w-100 mb-3'>
                            <TextField
                                label="Chat Name"
                                variant="outlined"
                                className='mb-2'
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button variant='contained' color="success" onClick={handleRename}>Update</Button>
                        </FormControl>
                        <FormControl className='w-full'>
                            <TextField
                                label="Add User to group"
                                variant="outlined"
                                className='mb-1'
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ?
                            <SkeletonLoader number={2} /> :
                            searchResults?.slice(0, 4)?.map((user) => {
                                return (
                                    <ListItem key={user._id} className={`bg-gray-200 p-0 border rounded-lg my-1 hover:bg-[#38B2AC]`}>
                                        <ListItemButton onClick={() => {
                                            handleAddUser(user)
                                        }}>
                                            <ListItemIcon>
                                                <span className='capitalize'><img src={user?.pic} alt={user?.name} className='size-10 rounded-full' /></span>
                                            </ListItemIcon>
                                            <ListItemText primary={user?.name} secondary={user?.email} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant='contained' color='error' onClick={() => handleDelete(user, true)}>
                        Leave Group
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateModalChat