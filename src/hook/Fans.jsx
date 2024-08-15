import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Fans = () => {

    const axiosPublic = useAxiosPublic()
    const url = '/fans'

    const {data:fans = [],refetch, isPending } = useQuery({
    queryKey:['fans'],
    queryFn: async() =>{
        const res = await axiosPublic.get(url)
        return res.data
    }
    })
    return [fans,refetch,isPending]
};

export default Fans;