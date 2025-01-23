import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import { loginUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error('Both email and password are required');
            return;
        }
        try {
            const formData = {
                email,
                password
            }

            const { data } = await loginUser(formData)
            localStorage.setItem('chat_app', JSON.stringify(data))
            toast.success('User logged in successfully');
            setEmail('');
            setPassword('');
            navigate('/chats')
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
            <div className='grid grid-cols-12 gap-5'>
                <TextField
                    required
                    variant="standard"
                    label="Email"
                    type="email"
                    className='md:col-span-6 w-100'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormControl className='md:col-span-6 w-100' variant="standard">
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
                <Button type='Submit' variant="contained" className='col-span-12' onClick={handleSubmit}>Submit</Button>
            </div>
        </Box>
    )
}

export default Login