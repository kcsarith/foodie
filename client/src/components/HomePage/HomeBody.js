import React, { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import './HomeBody.css'
import { useSelector } from 'react-redux';

function HomeBody() {

    const userId = useSelector(state => state.authentication.id)
    const [restData, setRestData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/users/${userId}`)
            const data = await res.json()
            setRestData(data.restaurants)
        }
        fetchData();
    }, []);

    const restComponents = restData.map((rest) => <RestaurantCard key={rest.id} rest={rest} />)

    return (
        <div className='restaurants-list'>
            {restComponents}
        </div>
    );
};


export default HomeBody
