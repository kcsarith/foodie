import React, { createRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
// import './RestaurantProfile.css'
// import '../HomePage/HomePage.css'
import Reservation from './Reservation'
import Review from './Review';
import RestaurantSafetyPrecautions from './RestaurantSafetyPrecautions'
// import ReservationList from './ReservationList'
import { Image, Container, Divider, Icon, Tab, Grid, List, Rating, Message, Rail, Header, Sticky, Input, Ref, Segment, Visibility } from 'semantic-ui-react'


const panes = [
    { menuItem: 'Overview' },
    { menuItem: 'Menu' },
    { menuItem: 'Reviews' },
]
const TabExampleSecondaryPointing = () => (
    <Tab menu={{ attached: false, tabular: false }} panes={panes} />
)

const ListExampleIcon = () => (
    <List>
        <List.Item as='a'>
            <Icon name='help' />
            <List.Content>
                <List.Header>Floated Icon</List.Header>
                <List.Description>
                    This text will always have a left margin to make sure it sits
                    alongside your icon
        </List.Description>
            </List.Content>
        </List.Item>
        <List.Item as='a'>
            <Icon name='right triangle' />
            <List.Content>
                <List.Header>Icon Alignment</List.Header>
                <List.Description>
                    Floated icons are by default top aligned. To have an icon top aligned
                    try this example.
        </List.Description>
            </List.Content>
        </List.Item>
    </List>
)

const RestaurantProfile = () => {
    const contextRef = createRef()
    const [restData, setRestData] = useState([])
    const [profileVisualState, setProfileVisualState] = useState({
        visible: true,
    });
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    console.log("history.location", history)
    const id = parseInt(idStr, 10)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/profile/${id}`)
            const data = await res.json()
            setRestData(data.restaurant)
        }
        fetchData()
    }, [])
    const leftWidth = 10;
    const rightWidth = 6;
    const restarauntImageUrl = 'https://www.tripsavvy.com/thmb/1gJhZ3yzuQF1rwJOIY-FJxFlres=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lagobellagio-56a447b53df78cf772818bdb.jpg'
    const placeholderText = `Located at Paris Hotel, Mon Ami Gabi is now open for limited dine-in services at 50% capacity. We thank you for your patience and trust in Lettuce Entertain You. As we begin the process to reopen for dine-in, the health and safety of our guests and employees always comes first. Steps we are taking: dine-in at 50% capacity, masks and gloves on all employees, disposable and digital menus, thorough sanitation procedures and continuous hand washing.
    \n
Just a few notes to help make your meal with us an enjoyable experience:
\n
- Guests are required to wear a mask, of course except while dining.
\n
- Reservations are for indoor dining only. NO RESERVATIONS guarantee for PATIO; patio seating is on a first come first served basis.
\n
- Please take care to arrive on time as we will not have a waiting area available.
\n
Thank you to all of our loyal guests who have supported us through this time. We are excited to be able to serve you again!
\n
Ryan Richardson, General Manager and Partner`;
    const handleDismissTopMessage = () => {
        setProfileVisualState({ ...profileVisualState, visible: false });

    }
    return (
        <>
            <Image src={restarauntImageUrl} centered style={{ width: '80%', height: '400px' }} />
            <div ref={contextRef} style={{ marginTop: '5em' }}>
                <Container text>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column width={leftWidth}>
                                <Sticky context={contextRef} offset={50}>
                                    <TabExampleSecondaryPointing />
                                </Sticky>
                                {profileVisualState.visible &&
                                    <Message
                                        icon='warning circle'
                                        color='red'
                                        onDismiss={handleDismissTopMessage}
                                        header='This restaurant added safety precaution details'
                                        content='This includes info about cleaning, sanitizing, social distancing, and usage of personal protective equipment.'
                                    />
                                }
                                <h1> {restData.name}</h1>
                                <Divider />
                                <Rating rating={Math.round(restData.avg_rating)} maxRating={5} disabled />
                                {restData.avg_rating ?
                                    <span>{restData.avg_rating}</span> :
                                    <span>No Ratings</span>
                                }
                                {placeholderText.split('\n').map(ele => <p>{ele}</p>)}
                                <RestaurantSafetyPrecautions />
                                <div>
                                    <Review id={id} restData={restData} />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={rightWidth}>
                                <Sticky context={contextRef} offset={50}>
                                    <Reservation restaurantName={restData.name} />
                                </Sticky>
                                <ListExampleIcon />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        </>
    )

}
function RestaurantProfile2() {

    const [restData, setRestData] = useState([])
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    console.log("history.location", history)
    const id = parseInt(idStr, 10)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/profile/${id}`)
            const data = await res.json()
            setRestData(data.restaurant)
        }
        fetchData()
    }, [])
    const restarauntImageUrl = 'https://www.tripsavvy.com/thmb/1gJhZ3yzuQF1rwJOIY-FJxFlres=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lagobellagio-56a447b53df78cf772818bdb.jpg'
    console.log('rest data for profiel-------', restData)
    return (
        <>
            <img src={restarauntImageUrl} fluid />
        </>
    )

}
export default RestaurantProfile
