import { useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChatState } from '../../context/ChatProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import CustomAvatar from './CustomAvatar';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import SideDrawer from './SideDrawer';

export default function NavBar() {
    const { user } = ChatState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const logoutHandler = () => {
        localStorage.removeItem('chat_app');
        navigate('/')
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={() => { handleMenuClose() }}
                className='flex gap-2'>
                <ProfileModal user={user}>My Profile</ProfileModal>
            </MenuItem>
            <MenuItem onClick={() => {
                handleMenuClose()
                logoutHandler()
            }}
                className='flex gap-2'>
                <LogoutIcon />Logout</MenuItem>
        </Menu>
    );

    return (
        <Box>
            <AppBar position="static">
                <Toolbar className='justify-between'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={toggleDrawer(true)}
                    >
                        <SearchIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Chat App
                    </Typography>
                    <Box>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <CustomAvatar name={user?.name} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}

            <SideDrawer open={open} onClose={toggleDrawer(false)} />
        </Box>
    );
}
