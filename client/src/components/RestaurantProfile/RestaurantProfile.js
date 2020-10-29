import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './RestaurantProfile.css'
import '../HomePage/HomePage.css'
import Reservation from './Reservation'
import Review from './Review';
import ReservationList from './ReservationList'

function RestaurantProfile() {

    const [restData, setRestData] = useState([])
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    console.log("history.location",history)
    const id = parseInt(idStr, 10)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/profile/${id}`)
            const data = await res.json()
            setRestData(data.restaurant)
        }
        fetchData()
    }, [])


    console.log('rest data for profiel-------', restData)
    return (
        <>
        <div className='restaurant__container'>
            <div className ='restaurant__left'>
                <h1> {restData.name}</h1>
                <h2> {restData,id}</h2>
                <div>
                <Review id={id}/>
                </div>

            </div>
            <div className ='restaurant__right'>
                <div className='restaurant__reservation'>
                    <Reservation/>
                </div>
                <div>
                    <ReservationList/>        
                </div>
            </div>
        </div>
        </>
    )

}

export default RestaurantProfile
