import React, { useEffect, useState } from 'react';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const [activeTab, setActiveTab] = useState('Login');
    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("chat_app"))

        if (userInfo) {
            navigate('/chats')
        }
    }, [navigate])

    return (
        <div className='w-100 xl:px-96 px-10 py-20'>
            <div className="grid grid-cols-12">
                <div className='col-span-12 text-center bg-white p-3 rounded-xl'>
                    <span className='text-4xl'>Chat App</span>
                </div>
                <Box className="col-span-12 bg-white p-3 rounded-xl mt-3">
                    <TabContext value={activeTab}>
                        <TabList onChange={handleChange}>
                            <Tab label="Login" value="Login" />
                            <Tab label="SignUp" value="SignUp" />
                        </TabList>
                        <TabPanel value="Login"><Login /></TabPanel>
                        <TabPanel value="SignUp"><SignUp /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default HomePage