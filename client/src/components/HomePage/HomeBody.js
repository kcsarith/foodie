import React, { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import './HomeBody.css'
import { useSelector } from 'react-redux';

function HomeBody({ data }) {

    const userId = useSelector(state => state.authentication.id)
    const [restData, setRestData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/${userId}`)
            const data = await res.json()
            setRestData(data.restaurants)
        }
        fetchData();
    }, [userId]);


    useEffect(() => {
        setRestData(data)
    }, [data])

    return (
        <div className='restaurants-list'>
            {restData.map((rest) => <RestaurantCard key={rest.id} rest={rest} />)}
        </div>

    );
};


export default HomeBody
