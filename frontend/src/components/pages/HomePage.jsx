import React, { useState } from 'react';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function HomePage() {

    const [activeTab, setActiveTab] = useState('Login');

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div className='w-100 lg:mx-96 py-20'>
            <div className="row">
                <div className='col-12 text-center bg-white p-3 rounded-xl'>
                    <span className='text-4xl'>Chat App</span>
                </div>
                <Box className="col-12 bg-white p-3 rounded-xl mt-3">
                    <TabContext value={activeTab}>
                        <Box>
                            <TabList onChange={handleChange}>
                                <Tab label="Login" value="Login" className='col-6' />
                                <Tab label="SignUp" value="SignUp" className='col-6' />
                            </TabList>
                        </Box>
                        <TabPanel value="Login"><Login /></TabPanel>
                        <TabPanel value="SignUp"><SignUp /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default HomePage