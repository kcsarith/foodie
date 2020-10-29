import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './RestaurantProfile.css'
import '../HomePage/HomePage.css'
import Reservation from './Reservation'
import Review from './Review';

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
    }, [id])


    return (
        <>
            <div className='profile-container'>
                <div className='left'>
                    <h1> {restData.name}</h1>
                    <h2> {restData, id}</h2>

                </div>
                <div className='right'>
                    <div className='reservation'>
                        <Reservation />
                    </div>
                </div>
                <div>
                    <Review id={id} />
                </div>

            </div>
        </>
    )

}

export default RestaurantProfile
