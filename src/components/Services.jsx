import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import { RiCustomerService2Line } from 'react-icons/ri';
import { TbTruck } from 'react-icons/tb';
import truck from '../assets/fast-delivery.png'

const Services = () => {
    return (
        <div className='flex justify-between items-center bg-gray-100 border my-10 p-20'>
        <div className='flex items-center gap-3'>
           <img className='w-20' src={truck} alt="" />
            <p className='text-xl font-bold'>Super Fast Shipping</p>
        </div>
        <div className='flex items-center gap-3'>
            <RiCustomerService2Line className='text-6xl'/>
            <p className='text-xl font-bold'>Expert Support</p>
        </div>
        <div className='flex items-center gap-3'>
            <FaTrophy className='text-6xl'/>
            <p className='text-xl font-bold'>Membership Rewards</p>
        </div>

        </div>
    );
};

export default Services;