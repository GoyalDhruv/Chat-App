
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ProfileModal({ user, children }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {
                children ?
                    <span onClick={handleOpen}>{children}</span>
                    :
                    <Button onClick={handleOpen} variant='contained'>
                        <VisibilityIcon />
                    </Button>
            }
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" className='capitalize text-center mb-2'>
                        {user?.name}
                    </Typography>
                    <Typography id="modal-modal-description" className='flex items-center flex-col'>
                        <img src={user?.pic} alt={user?.name} className='rounded-full w-60 h-60' />
                        <p className='mb-0 mt-3 text-2xl'>Email:{user?.email}</p>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
