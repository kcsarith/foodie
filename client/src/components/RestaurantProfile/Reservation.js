import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Segment, Confirm, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import './Reservation.css'
import { setPoints } from '../../store/authentication';

const getPeopleArray = function () {
    let newArray = [];
    for (let i = 1; i <= 15; i++) {
        let puralOrNotPerson = 'person';
        if (i > 1) {
            puralOrNotPerson = 'people'
        }
        let personText = `${i} ${puralOrNotPerson}`
        newArray.push({ key: `${personText}`, value: `${personText}`, text: `${personText}` })
    }
    return newArray;
}
const peopleOptions = getPeopleArray()
// { key: '1 person', value: 'af', text: 'Afghanistan' },

export default function Reservation({ restaurantName }) {
    let now = new Date().toISOString().substring(0, 10)
    const [reservationState, setReservationState] = useState({
        submitted: false,
        openConfirmModal: false,
        messageVisibility: false,
        restaurantName: 'Untitled',
        date: now,
        time: '19:30',
        group: '1 person'
    });

    const dispatch = useDispatch();
    const user_id = useSelector(state => state.authentication.id);
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    const restaurant_id = parseInt(idStr, 10)

    function handleChange(e) {
        const { id, value } = e.target;
        setReservationState({ ...reservationState, [id]: value })
    }
    function handleSelectorChange(e, props) {
        setReservationState({ ...reservationState, 'group': props.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setReservationState({ ...reservationState, openConfirmModal: true });
    }
    const handleCancel = async (e) => {
        setReservationState({ ...reservationState, openConfirmModal: false });
    }
    const handleConfirm = async (e) => {
        setReservationState({ ...reservationState, messageVisibility: true, submitted: true, openConfirmModal: false });
        handleReservation(user_id);
    }

    async function handleReservation(user_id) {
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

        if (response.ok) {
            setTimeout(() => {
                setReservationState({ ...reservationState, openConfirmModal: false, messageVisibility: false });
            }, 2000)
        }

        // set points
        const set_point = 200;
        const res = await fetchWithCSRF(`/api/home/restaurant/setpoint/${user_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                set_point
            }),
        })
        const data = await res.json();
        let points = data["user"].points;
        dispatch(setPoints(points))
    }


    return (
        <>
            <Segment>
                <h2>Make a Reservation </h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Party Size</label>
                        <Dropdown placeholder='1 person?' defaultValue={0} options={peopleOptions} onChange={handleSelectorChange} search selection />
                    </Form.Field>
                    <Form.Field>
                        <label>Date</label>
                        <input type="date" id="date" defaultValue={now} onChange={handleChange} />
                        <div className='reserv__time' id="time" onChange={handleChange}>
                            <label htmlFor="time">Time</label>
                            <input
                                id="time"
                                label="Time"
                                type="time"
                                defaultValue="19:30"
                            // inputLabelProps={{
                            //     shrink: true,
                            // }}
                            // inputProps={{
                            //     step: 300, // 5 min
                            // }}
                            />
                        </div>
                    </Form.Field>
                    <Button color='red' type='submit'>Find a table</Button>
                </Form>
                {/* <div className="reservation_container">
                    <form name='form' onSubmit={handleSubmit}>
                        <div className='reserv__group'>
                            <label htmlFor="group">Party Size</label>
                            <select className='reserv__groupSelect' label='2 People' id="group" defaultValue='2 People' onChange={handleChange}>
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
                            </div>
                            <div className="reserv__result" id="result">{res}</div>
                            </form>
                        </div> */}
                {reservationState.messageVisibility &&
                    <Message
                        success
                        header='Reserve Success'
                        content={`Book ${restaurantName} for ${reservationState.group}`}
                    />
                }
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
