import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex h-screen'>
            
            <Sidebar></Sidebar>
            <div className='lg:flex-1 p-2 md:p-4 bg-gray-100 overflow-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;