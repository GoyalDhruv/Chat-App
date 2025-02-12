import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { registerUser } from '../../services/userApi';
import toast from 'react-hot-toast';

function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.error('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const formData = {
                name,
                email,
                password
            }

            await registerUser(formData)

            toast.success('User registered successfully');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
    }

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1 } }}
            noValidate
            autoComplete="off"
        >
            <div className='grid grid-cols-12 md:gap-5'>
                <TextField
                    required
                    type="text"
                    variant="standard"
                    label="Name"
                    className='md:col-span-6 col-span-12 w-100'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    variant="standard"
                    label="Email"
                    type="email"
                    className='md:col-span-6 col-span-12 w-100'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl className='md:col-span-6 col-span-12 w-100' variant="standard">
                    <InputLabel>Password</InputLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className='md:col-span-6 col-span-12 w-100' variant="standard">
                    <InputLabel>Confirm Password</InputLabel>
                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {/* <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    className='col-span-12 w-100'
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setPicture(event.target.files[0])}
                    />
                </Button> */}

                <Button type='Submit' variant="contained" className='col-span-12 mt-3' onClick={handleSubmit}>Submit</Button>
            </div>
        </Box>
    )
}

export default SignUp