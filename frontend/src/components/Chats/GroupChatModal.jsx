import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { getUserBySearch } from '../../services/userApi';
import toast from 'react-hot-toast';
import SkeletonLoader from '../loader/SkeletonLoader';
import { createGroupChat } from '../../services/chatsApi';

export default function GroupChatModal({ children }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { chats, setChats } = ChatState();

    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleGroup = (user) => {
        if (selectedUsers.includes(user)) {
            toast.error("User already selected");
            return;
        }
        setSelectedUsers(prevUsers => [...prevUsers, user]);

    }

    const handleDelete = (user) => {
        setSelectedUsers(prevUsers => prevUsers.filter(u => u._id !== user._id));
    }


    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast.error("Please fill all the fields");
            return;
        }

        if (selectedUsers?.length < 2) {
            toast.error("Group chat requires at least 2 users");
            return;
        }

        try {
            const formData = {
                name: groupChatName,
                users: JSON.stringify(selectedUsers?.map(u => u._id))
            }
            const { data } = await createGroupChat(formData);
            setChats([data, ...chats]);
            handleClose();
            toast.success("New Group chat created successfully");
        } catch (error) {
            toast.error("Error in creating group chat");
            console.error(error);
        }
    }

    return (
        <>
            <div className='col-span-12 xl:col-span-6 w-100' onClick={handleClickOpen}>{children}</div>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2, pb: 0, fontSize: '25px' }} id="customized-dialog-title">
                    Create Group Chat
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
                        <FormControl className='w-full'>
                            <TextField
                                label="Chat Name"
                                variant="outlined"
                                className='mb-3'
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl className='w-full'>
                            <TextField
                                label="Add Users"
                                variant="outlined"
                                className='mb-1'
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        <Box className='w-full flex flex-wrap'>
                            {selectedUsers?.map((user) => (
                                <span key={user._id} className='px-2 py-1 rounded-lg m-1 mb-2 text-sm cursor-pointer bg-red-700 text-white flex items-center'>
                                    <span>{user.name}</span>
                                    <CloseIcon fontSize='small' onClick={() => handleDelete(user)} />
                                </span>
                            ))
                            }
                        </Box>

                        {loading ?
                            <SkeletonLoader number={4} /> :
                            searchResults?.slice(0, 4)?.map((user) => {
                                return (
                                    <ListItem key={user._id} className={`${selectedUsers?.find(u => u._id === user._id) ? "bg-[#38B2AC]" : "bg-gray-200"} p-0 border rounded-lg my-1 hover:bg-[#38B2AC]`}>
                                        <ListItemButton onClick={() => {
                                            handleGroup(user)
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
                    <Button autoFocus variant='contained' onClick={handleSubmit}>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
