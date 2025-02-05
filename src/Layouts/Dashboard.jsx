import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex h-screen'>
            
            <Sidebar></Sidebar>
            <div className='flex-2 p-4 bg-gray-100'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;