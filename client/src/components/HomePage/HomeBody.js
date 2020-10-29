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


    console.log(data)
    if (data.length !== 0) {
        setRestData(data)
    }

    const restComponents = restData.map((rest) => <RestaurantCard key={rest.id} rest={rest} />)

    return (
        <div className='restaurants-list'>
            {restComponents}
        </div>

    );
};


export default HomeBody
