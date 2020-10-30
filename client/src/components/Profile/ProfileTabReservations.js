import React, { useState, useEffect } from 'react';
import { Button, Header, Label, Item, Icon, Progress, Segment, Transition } from 'semantic-ui-react';
import { useSelector } from 'react-redux';


const tempImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'

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

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch(`/api/home/restaurant/reservationlist/${user_id}`)
    //         const data = await res.json()
    //         setReserveList(data.reservation)
    //     }
    //     fetchData()
    // }, [])

    async function fetchReservData() {
        const res = await fetch(`/api/home/restaurant/reservationlist/${user_id}`)
        const data = await res.json()
        setReserveList(data.reservation)
    }

    useEffect(() => {
        fetchReservData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reserv_id = e.target.value;
        const response = await fetchWithCSRF(`/api/home/restaurant/reservationcancel/${reserv_id}`, {
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
                <Transition animation='fade' duration={200}>
                    <Item.Group divided>
                        {reserveList.length > 0 ? reserveList.map((reserv, index) => (<Item key={`${index}-${reserv.restaurant_id}-${reserv.user_id}`}>
                            <Item.Image src={tempImageUrl} />
                            <Item.Content>
                                <Item.Header as='a'>{reserv.restaurant_name}</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>{reserv.restaurant_address}</span>
                                </Item.Meta>
                                <Item.Description>Reservation Date and Time:  {reserv.start_time}</Item.Description>
                                <Item.Description>Party of {reserv.group_num}</Item.Description>
                                <Item.Extra>
                                    <Button type="submit" value={reserv.id} onClick={handleSubmit} primary floated='right'>Cancel Reservation<Icon name='right chevron' /></Button>
                                    <Label>Limited</Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>)) : ''
                        }
                    </Item.Group>
                </Transition>
            </Segment>
        </>
    )
}


const ProfileTabReservations = () => {
    const [tabState, setTabState] = useState({
        pointsCurrent: 845,
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
