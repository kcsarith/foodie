import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TimePickers from '../HomePage/TimePicker'
import { useHistory } from 'react-router-dom';
import { Segment, Confirm, Message } from 'semantic-ui-react';
import './Reservation.css'


export default function Reservation({ restaurantName }) {
    let now = new Date().toISOString().substring(0, 10)
    const [reservationState, setReservationState] = useState({
        submitted: false,
        openConfirmModal: false,
        messageVisibility: false,
        restaurantName: 'Untitled',
        date: now,
        time: '19:30',
        group: '2 People'
    });

    const user_id = useSelector(state => state.authentication.id);
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    const restaurant_id = parseInt(idStr, 10)
    function handleChange(e) {
        const { id, value } = e.target;
        setReservationState({ ...reservationState, [id]: value })
    }

    let res = ''

    const handleSubmit = async (e) => {
        e.preventDefault();
        setReservationState({ ...reservationState, openConfirmModal: true });
    }
    const handleCancel = async (e) => {
        setReservationState({ ...reservationState, openConfirmModal: false });
    }
    const handleConfirm = async (e) => {
        setReservationState({ ...reservationState, messageVisibility: true, submitted: true, openConfirmModal: false });
        handleReservation();
    }

    async function handleReservation() {
        const { date, time, group } = reservationState;
        const group_num = parseInt(group.substring(0, 2));
        const start_time = date + ' ' + time;
        const response = await fetchWithCSRF("/api/home/restaurant/reserve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                restaurant_id,
                group_num,
                start_time
            }),
        })
        console.log(response)
        if (response.ok) {
            setTimeout(() => {
                setReservationState({ ...reservationState, openConfirmModal: false, messageVisibility: false });
            }, 2000)
        }

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
                                <label htmlFor="date">Date</label>
                                <input type="date" id="date" defaultValue={now} onChange={handleChange} />
                            </div>
                            <div className='reserv__time' id="time" onChange={handleChange}>
                                <label htmlFor="time">Time</label>
                                <TimePickers />
                            </div>
                        </div>
                        <div>
                            <button className='reserv__button' type='submit'>Find a table</button>
                            {reservationState.messageVisibility &&
                                <Message
                                    success
                                    header='Reserve Success'
                                    content={`Book ${restaurantName} on ${reservationState.date} for ${reservationState.group}`}
                                />
                            }
                        </div>
                        <div className="reserv__result" id="result">{res}</div>
                    </form>
                </div>
                {/* container--finish */}
            </Segment>
            <Confirm
                open={reservationState.openConfirmModal}
                content={`Reserved ${restaurantName} for ${reservationState.group}`}
                cancelButton='Never mind'
                confirmButton="Let's do it"
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    )
}
