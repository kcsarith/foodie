import React, { useState, useEffect } from 'react';
import { Header, Confirm, Item, Icon, Progress, Segment, Transition } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import './ProfileTabReservations.css'

const Points = ({ tabState, setTabState }) => {
    return (
        <>
            <Header as='h2' attached='top'>Points</Header>
            <Segment attached>
                <Progress percent={(tabState.pointsCurrent / tabState.pointsUntilReward) * 100} indicating />
            </Segment>
        </>
    )
}

const UpcomingReservations = (props) => {

    const [reserveList, setReserveList] = useState([])
    const user_id = useSelector(state => state.authentication.id);
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);

    async function fetchReservData() {
        const res = await fetch(`/api/home/restaurant/reservationlist/${user_id}`)
        const data = await res.json()
        setReserveList(data.reservation)
    }

    useEffect(() => {
        fetchReservData()
    }, [])

    const [tabReservationState, setTabReservationState] = useState({
        open: false,
        confirm: false,
        reservId: null
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTabReservationState({ ...tabReservationState, open: true, reservId: e.target.value })
    }
    const handleCancel = () => {
        setTabReservationState({ ...tabReservationState, open: false, confirm: false })
    }
    const handleConfirm = async () => {
        setTabReservationState({ ...tabReservationState, open: false, confirm: false })
        console.log(tabReservationState.reservId)
        const response = await fetchWithCSRF(`/api/home/restaurant/reservationcancel/${tabReservationState.reservId}`, {
            method: "DELETE"
        })

        if (response.ok) {
            fetchReservData()
        }
    }
    return (
        <>
            <Header as='h2' attached='top'>Upcoming Reservations</Header>
            <Segment attached>
                {reserveList.length > 0 ? reserveList.map((reserv, index) => (<Item key={`${index}-${reserv.restaurant_id}-${reserv.user_id}`}>
                    <div className='profile-reserve'>
                        <div className='profile-reserve__img'>
                            <img src={reserv.restaurant_img} alt='' />
                        </div>
                        <div className='profile-reserve__stuff'>
                            <div className='profile-reserve__info'>
                                <div className='profile-reserve__name'>
                                    {reserv.restaurant_name}
                                </div>
                                <div className='profile-reserve__address'>
                                    {reserv.restaurant_address}
                                </div>
                                <div className='profile-reserve__time'>
                                    Reservation Date and Time - {new Date(reserv.start_time).toLocaleString()}
                                </div>
                                <div className='profile-reserve__group'>
                                    Party of - {reserv.group_num}
                                </div>
                            </div>
                            <div className='profile-reserve__btn'>
                                <button className='reserve-btn' type='submit' value={reserv.id} onClick={handleSubmit}>Cancel Reservation</button>
                            </div>
                        </div>
                    </div>
                </Item>)) : 'No Reservations yet'
                }
            </Segment>
            <Confirm
                open={tabReservationState.open}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    )
}


const ProfileTabReservations = () => {
    const authSelector = useSelector(state => state.authentication)

    const [tabState, setTabState] = useState({
        pointsCurrent: authSelector.points,
        pointsUntilReward: 2000
    });


    return (
        <>
            <Points tabState={tabState} setTabState={setTabState} />
            <UpcomingReservations />
        </>
    )
}

export default ProfileTabReservations
