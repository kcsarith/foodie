import React, { createRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import Reservation from './Reservation'
import Review from './Review';
import RestaurantSafetyPrecautions from './RestaurantSafetyPrecautions'
import { Image, Container, Divider, Icon, Menu, Grid, List, Rating, Message, Button, Tab, Sticky, Segment, Header, Transition } from 'semantic-ui-react'

import Footer from '../Footer';
const findKeyValueInObjectArrayExists = (array, key, value) => {
    for (let i = 0; i < array.length; i++) {
        const ele = array[i];
        if (ele[key] === value) return true;
    }
    return false;
}


const RestaurantTabs = ({ hashLocationState, setHashLocationState }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const onScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        setScrollTop(winScroll);
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    })
    const handleTabClick = (e, props) => {
        setHashLocationState({ ...hashLocationState, activeTab: props.name })
    }
    return (
        <Menu pointing secondary fluid style={{ backgroundColor: 'white' }}>
            <HashLink smooth to='#overview' >
                <Menu.Item
                    name='Overview'
                    active={scrollTop <= hashLocationState.menuY - 190 ? true : false}
                    onClick={handleTabClick}
                />
            </HashLink>
            <HashLink smooth to='#menu' >
                <Menu.Item
                    name='Menu'
                    active={scrollTop > hashLocationState.menuY - 190 && scrollTop <= hashLocationState.reviewsY - 190 ? true : false}
                    onClick={handleTabClick}
                />
            </HashLink>
            <HashLink smooth to='#reviews' >
                <Menu.Item
                    name='Reviews'
                    active={scrollTop > hashLocationState.reviewsY - 190 ? true : false}
                    onClick={handleTabClick}
                />
            </HashLink>
        </Menu>
    )
}

const MenuTabs = () => {
    const forTheTable = {
        name: 'For the table',
        menu: [
            { name: "LG's Arepa Basket", price: 10.00, description: 'Lorena Garcias select arepas served with nata butter' },
            { name: "Wild Mushroom Tostada", price: 14.00, description: 'roasted wild mushroom, whipped queso fresco, salsa verde, shaved radish, epazote' },
            { name: "Guacamole", price: 16.00, description: 'Hass avocado, cilantro, chile, served with crispy tortillas, assorted arepas & plantain chips' },
        ]
    }
    const salads = {
        name: 'For the table',
        menu: [
            { name: "Kale & Lime Salad", price: 16.00, description: 'green apples, cranberries, pumpkin seeds, croutons, citrus yogurt dressing' },
            { name: "Romaine & Watercress Salad", price: 16.00, description: 'croutons, parmesan cheese, cilantro goddess dressing' },
            { name: "Chica Salad", price: 16.00, description: 'roasted corn, black eyed peas, tomato, bell pepper, Oaxaca cheese, tortilla strips, chipotle vinaigrette' },
        ]
    }
    const startYourMeal = {
        name: 'Start your meal',
        menu: [
            { name: "Kale & Lime Salad", price: 16.00, description: 'green apples, cranberries, pumpkin seeds, croutons, citrus yogurt dressing' },
            { name: "Romaine & Watercress Salad", price: 16.00, description: 'croutons, parmesan cheese, cilantro goddess dressing' },
            { name: "Chica Salad", price: 16.00, description: 'roasted corn, black eyed peas, tomato, bell pepper, Oaxaca cheese, tortilla strips, chipotle vinaigrette' },
        ]
    }
    const panes = [
        {
            menuItem: 'Dinner', render: () =>
                <Tab.Pane>
                    <h4>{forTheTable.name}</h4>
                    <List>
                        {forTheTable.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{salads.name}</h4>
                    <List>
                        {salads.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{startYourMeal.name}</h4>
                    <List>
                        {startYourMeal.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <p>*Thoroughly cooking foods of animal origin such as beef, eggs, fish, lamb, milk, poultry, or shellfish reduces the risk of foodborne illness. Individuals with certain health conditions may be at higher risk if these foods are consumed raw or undercooked</p>
                </Tab.Pane>
        },
        {
            menuItem: 'Brunch', render: () =>
                <Tab.Pane><h4>{startYourMeal.name}</h4>
                    <List>
                        {startYourMeal.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{forTheTable.name}</h4>
                    <List>
                        {forTheTable.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{salads.name}</h4>
                    <List>
                        {salads.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <p>*Thoroughly cooking foods of animal origin such as beef, eggs, fish, lamb, milk, poultry, or shellfish reduces the risk of foodborne illness. Individuals with certain health conditions may be at higher risk if these foods are consumed raw or undercooked</p></Tab.Pane>
        },
        {
            menuItem: 'Dessert', render: () =>
                <Tab.Pane>
                    <h4>{forTheTable.name}</h4>
                    <List>
                        {forTheTable.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{salads.name}</h4>
                    <List>
                        {salads.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{startYourMeal.name}</h4>
                    <List>
                        {startYourMeal.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <p>*Thoroughly cooking foods of animal origin such as beef, eggs, fish, lamb, milk, poultry, or shellfish reduces the risk of foodborne illness. Individuals with certain health conditions may be at higher risk if these foods are consumed raw or undercooked</p>
                </Tab.Pane>
        },
        {
            menuItem: 'Drinks', render: () =>
                <Tab.Pane>
                    <h4>{salads.name}</h4>
                    <List>
                        {salads.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{startYourMeal.name}</h4>
                    <List>
                        {startYourMeal.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <h4>{forTheTable.name}</h4>
                    <List>
                        {forTheTable.menu.map((ele, index) =>
                            <List.Item key={index}>
                                <List.Header>{ele.name} ${ele.price}</List.Header>
                                {ele.description}
                            </List.Item>)}
                    </List>
                    <p>*Thoroughly cooking foods of animal origin such as beef, eggs, fish, lamb, milk, poultry, or shellfish reduces the risk of foodborne illness. Individuals with certain health conditions may be at higher risk if these foods are consumed raw or undercooked</p>
                </Tab.Pane>
        },
        {
            menuItem: 'Whine', render: () => <Tab.Pane>
                <h4>{forTheTable.name}</h4>
                <List>
                    {forTheTable.menu.map((ele, index) =>
                        <List.Item key={index}>
                            <List.Header>{ele.name} ${ele.price}</List.Header>
                            {ele.description}
                        </List.Item>)}
                </List>
                <h4>{salads.name}</h4>
                <List>
                    {salads.menu.map((ele, index) =>
                        <List.Item key={index}>
                            <List.Header>{ele.name} ${ele.price}</List.Header>
                            {ele.description}
                        </List.Item>)}
                </List>
                <h4>{startYourMeal.name}</h4>
                <List>
                    {startYourMeal.menu.map((ele, index) =>
                        <List.Item key={index}>
                            <List.Header>{ele.name} ${ele.price}</List.Header>
                            {ele.description}
                        </List.Item>)}
                </List>
                <p>*Thoroughly cooking foods of animal origin such as beef, eggs, fish, lamb, milk, poultry, or shellfish reduces the risk of foodborne illness. Individuals with certain health conditions may be at higher risk if these foods are consumed raw or undercooked</p>
            </Tab.Pane>
        },
    ]
    return <><Tab panes={panes} /></>
}

const ListExampleIcon = () => (
    <List>
        <List.Item >
            <Icon name='clock' />
            <List.Content>
                <List.Header>Hours of Operation</List.Header>
                <List.Description>
                    Mon–Thu, 7:00 am–10:00 pm <br />
                    Fri, Sat 7:00 am–11:00 pm<br />
                </List.Description>
            </List.Content>
        </List.Item>
        <List.Item >
            <Icon name='food' />
            <List.Content>
                <List.Header>Cuisine</List.Header>
                <List.Description>
                    Vegan
                </List.Description>
            </List.Content>
        </List.Item>
        <List.Item >
            <Icon name='credit card' />
            <List.Content>
                <List.Header>Payment Options</List.Header>
                <List.Description>
                    AMEX, Carte Blanche, Diners Club, Discover, JCB, MasterCard, Visa
                </List.Description>
            </List.Content>
        </List.Item>
        <List.Item >
            <Icon name='phone' />
            <List.Content>
                <List.Header>Phone Number</List.Header>
                <List.Description>
                    555-555-5555
                </List.Description>
            </List.Content>
        </List.Item>
        <List.Item >
            <Icon name='bell' />
            <List.Content>
                <List.Header>Catering</List.Header>
                <List.Description>
                    We have glass-enclosed private & semi private function facilities located directly across from The Bellagio Water Show, as well as private rooms off of our main dining area, with oversized chandeliers, plush red velvet drapes, and richly stained mahogany. From corporate events, to formal wedding receptions, you’ll feel right at home in our establishment. Capacity: Our 2 Private Rooms have seating for up to 80 guests. The glass-enclosed Pavilion has semi-private areas accommodating groups 80. The entire Pavilion & outdoor Patio is also available for buyouts of up to 350.
                </List.Description>
            </List.Content>
        </List.Item>
    </List>
)

const RestaurantProfile = () => {
    const contextRef = createRef()
    const authSelector = useSelector(state => state.authentication);
    const [profileVisualState, setProfileVisualState] = useState({
        visible: true,
        allRatings: [],
        address: "Loading...",
        avg_rating: 0,
        totalReviews: 0,
        city: "Loading...",
        id: null,
        img: "",
        max_price: 5,
        min_price: 0,
        name: "Loading...",
        state: "Loading...",
        favorited: null,
        triggerFave: true,
    });
    const [hashLocationState, setHashLocationState] = useState({
        overviewY: 100,
        menuY: 200,
        reviewsY: 500,
        activeTab: "Overview",
    })
    const history = useHistory()
    const idStr = history.location.pathname.split('/')[3]
    const id = parseInt(idStr, 10)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/profile/${id}`)
            const data = await res.json()

            const res2 = await fetch(`/api/home/restaurant/${id}`)
            const data2 = await res2.json()
            const allRatings = getAllRatings(data2.reviews)
            let avg_rating = 0;
            const overviewEle = document.getElementById('overview')
            const menuEle = document.getElementById('menu')
            const reviewsEle = document.getElementById('reviews')
            let overviewClientRect;
            let menuClientRect;
            let reviewsClientRect;
            if (overviewEle) {
                overviewClientRect = overviewEle.getBoundingClientRect()
            }
            if (menuEle) {
                menuClientRect = menuEle.getBoundingClientRect()
            }

            if (reviewsEle) {
                reviewsClientRect = reviewsEle.getBoundingClientRect();
            }
            if (overviewEle && menuEle && reviewsEle) {
                setHashLocationState({ ...hashLocationState, overviewY: overviewClientRect.top, menuY: menuClientRect.top, reviewsY: reviewsClientRect.top })
            }
            if (allRatings.length) {
                avg_rating = (allRatings.reduce((accum, currentValue) => (accum + currentValue)) / allRatings.length).toFixed(2)
            }
            let isFavorited = false
            if (authSelector.id) {
                const res3 = await fetch(`/api/users/${authSelector.id}/favorites`)
                const data3 = await res3.json()
                isFavorited = findKeyValueInObjectArrayExists(data3.favorites, 'id', profileVisualState.id)
            }
            setProfileVisualState({ ...profileVisualState, allRatings: allRatings, ...data.restaurant, totalReviews: allRatings.length, avg_rating: avg_rating, favorited: isFavorited })
        }
        fetchData()
        //make sure renders correctly
    }, [profileVisualState.id])
    const getAllRatings = (restaurantDataArray) => {
        let allRatings = [];
        if (restaurantDataArray) {
            restaurantDataArray.forEach(ele => {
                allRatings.push(ele.rating);
            });
            return allRatings;
        }
    }
    const leftWidth = 10;
    const rightWidth = 6;
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
    const handleFavorite = async () => {
        if (profileVisualState.favorited) {
            const res = await authSelector.csrf(`/api/users/${authSelector.id}/favorites/delete/${profileVisualState.id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                setProfileVisualState({ ...profileVisualState, favorited: false, triggerFave: !profileVisualState.triggerFave })
            }
        }
        else {
            const res = await authSelector.csrf(`/api/users/${authSelector.id}/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    restaurant_id: profileVisualState.id
                })
            })
            if (res.ok) {
                setProfileVisualState({ ...profileVisualState, favorited: true, triggerFave: !profileVisualState.triggerFave })
            }
        }
    }
    return (
        <>
            <Segment style={{ position: 'relative' }}>
                <Image centered src={profileVisualState.img} style={{ width: '80%', height: '400px' }} />
                {profileVisualState.id &&
                    <Transition
                        animation={profileVisualState.favorited ? 'jiggle' : 'shake'}
                        duration={500}
                        visible={profileVisualState.triggerFave}
                    >
                        <Button color={profileVisualState.favorited ? 'red' : 'grey'} style={{ position: 'absolute', right: '20em', top: '4em' }} onClick={handleFavorite}><Icon name='bookmark' />Save this restaurant</Button>
                    </Transition>
                }
            </Segment>
            <div ref={contextRef} style={{ marginTop: '5em' }}>
                <Container text>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column width={leftWidth}>
                                <Sticky context={contextRef} offset={50} id='overview'>
                                    <RestaurantTabs profileVisualState={profileVisualState} hashLocationState={hashLocationState} setHashLocationState={setHashLocationState} />
                                </Sticky>
                                {profileVisualState.visible &&
                                    <Message
                                        icon='warning circle'
                                        onDismiss={handleDismissTopMessage}
                                        header='This restaurant added safety precaution details'
                                        content='This includes info about cleaning, sanitizing, social distancing, and usage of personal protective equipment.'
                                    />
                                }
                                <h1> {profileVisualState.name}</h1>
                                <Divider />
                                <Rating rating={profileVisualState.allRatings.length ? Math.round(profileVisualState.avg_rating) : 0} maxRating={5} disabled />
                                {profileVisualState.allRatings.length ?
                                    <><span>{profileVisualState.avg_rating} <Icon name='pencil alternate' /> {profileVisualState.totalReviews} review(s)</span></> :
                                    <span>No Ratings</span>
                                }
                                {placeholderText.split('\n').map((ele, index) =>
                                    <div key={`${index}-${ele.id}`}>
                                        <p>{ele}</p>
                                    </div>
                                )}
                                <RestaurantSafetyPrecautions />
                                <h2 id='menu'>Menu</h2>
                                <Divider />
                                <MenuTabs />
                                <Header as='h3' id='reviews' dividing> Reviews</Header>
                                <Review profileVisualState={profileVisualState} setProfileVisualState={setProfileVisualState} hashLocationState={hashLocationState} setHashLocationState={setHashLocationState} />
                            </Grid.Column>
                            <Grid.Column width={rightWidth}>
                                <Sticky context={contextRef} offset={50}>
                                    <Reservation restaurantName={profileVisualState.name} />
                                </Sticky>
                                <ListExampleIcon />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
            <Footer />
        </>
    )

}

export default RestaurantProfile
