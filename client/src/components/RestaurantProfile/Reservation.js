import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import TimePickers from '../HomePage/TimePicker'
import { useHistory } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import './Reservation.css'


export default function Reservation(props) {

    let now = new Date().toISOString().substring(0, 10)
    const [reserv, setReserv] = useState({
        date: now,
        time: "19:30",
        group: "2 People"
    });
    const user_id = useSelector(state => state.authentication.id);
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    const restaurant_id = parseInt(idStr, 10)
    function handleChange(e) {
        const { id, value } = e.target;
        setReserv(reserv => ({ ...reserv, [id]: value }))
    }

    let res = ''

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleReservation();
    }

    async function handleReservation() {
        const { date, time, group } = reserv;
        const group_num = parseInt(group.substring(0, 2));
        const start_time = date + ' ' + time;
        await fetchWithCSRF("/api/home/restaurant/reserve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                restaurant_id,
                group_num,
                start_time
            }),
        })

        // if (response.ok) {
        //     res = 'The reservation has been made successfully.'
        //     window.alert(res);
        // }

    }

    // useEffect(() => {
    //      document.getElementById("result").value = res
    //     }, [])




    return (
        <>
            <Segment>
                <div className="reserv__title"> <h2>Make a Reservation </h2> </div>
                <div className="reservation_container">
                    <form name='form' onSubmit={handleSubmit}>
                        <div className='reserv__group'>
                            <label htmlFor="group">Party Size</label>
                            <select className='reserv__groupSelect' label='2 People' id="group" defaultValue='2 People' onChange={handleChange}>
                                {/* { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map( (i) =>(
                        <option>{i} </option>
                    ))} */}
                                <option> 1 Person</option>
                                <option> 2 People</option>
                                <option> 3 People</option>
                                <option> 4 People</option>
                                <option> 5 People</option>
                                <option> 6 People</option>
                                <option> 7 People</option>
                                <option> 8 People</option>
                                <option> 9 People</option>
                                <option> 10 People</option>
                                <option> 11 People</option>
                                <option> 12 People</option>
                                <option> 13 People</option>
                                <option> 14 People</option>
                                <option> 15 People</option>
                            </select>
                        </div>
                        <div className="reserv__date__time">
                            <div className='reserv__date'>
                                <label htmlFor="date">Date</label><br /><br />
                                <input type="date" id="date" defaultValue={now} onChange={handleChange} />
                            </div>
                            <div className='reserv__time' id="time" onChange={handleChange}>
                                <label htmlFor="time">Time</label>
                                <TimePickers />
                            </div>
                        </div>
                        <div>
                            <button className='reserv__button' type='submit'>Find a table</button>
                        </div>
                        <div className="reserv__result" id="result">{res}</div>
                    </form>
                </div>
                {/* container--finish */}
            </Segment>
        </>
    )
}
