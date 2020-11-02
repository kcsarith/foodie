import React, { useState, useEffect } from 'react';
import { Header, Confirm, Item, Progress, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './ProfileTabReservations.css'
import { setPoints } from '../../store/authentication';

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
    const dispatch = useDispatch();

    async function fetchReservDataList() {
        const res = await fetch(`/api/home/restaurant/reservationlist/${user_id}`)
        const data = await res.json()
        setReserveList(data.reservation)
    }

    useEffect(() => {
        async function fetchReservData() {
            const res = await fetch(`/api/home/restaurant/reservationlist/${user_id}`)
            let newSortedReviews = [];
            if (res.ok) {
                const data = await res.json()
                newSortedReviews = data.reservation.sort((currentEle, nextEle) => nextEle.id - currentEle.id);
                setReserveList(newSortedReviews)
            }
        }
        fetchReservData()
    }, [user_id])

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
        const response = await fetchWithCSRF(`/api/home/restaurant/reservationcancel/${tabReservationState.reservId}`, {
            method: "DELETE"
        })


        if (response.ok) {
            fetchReservDataList()

            const set_point = -200;
            const res = await fetchWithCSRF(`/api/home/restaurant/setpoint/${user_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    set_point
                }),
            })
            const data = await res.json();
            let points = data["user"].points;
            dispatch(setPoints(points));
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
