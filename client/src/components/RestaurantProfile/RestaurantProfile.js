import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Review from './Review.js';

function RestaurantProfile() {

    const [restData, setRestData] = useState([])
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    const id = parseInt(idStr, 10)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/profile/${id}`)
            const data = await res.json()
            setRestData(data.restaurant)
        }
        fetchData()
    }, [])
    return (
      <>
        <h1> {restData.name}</h1>
        <Review id={id} />
      </>
    )

}

export default RestaurantProfile
