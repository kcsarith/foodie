import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';




export default function ReservationList(props) {

    const [reserveList, setReserveList] = useState([])
    const user_id = useSelector(state => state.authentication.id);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/reservationlist/${user_id}`)
            const data = await res.json()
            console.log("data::::::", data)
            setReserveList(data.reservation)
        }
        fetchData()
    }, [])
 

return (
    <>
        {reserveList.map( (reservation, index) =>
              <div key={`${index}-${reservation.restaurant_id}-${reservation.user_id}`} className='container__reviews'>
                  <p className='container__reviews__text'>{reservation.user_id}</p>
                  <p className='container__reviews__text'>{reservation.restaurant_id}</p>
                  <p className='container__reviews__text'>{reservation.restaurant_name}</p>
                  <p className='container__reviews__text'>{reservation.group_num}</p>
                  <p className='container__reviews__text'>{reservation.start_time}</p>
              </div>
            )}

    </>
)
}