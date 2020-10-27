import React, { useState } from 'react'
import { Grid, Menu, Rail, Segment, Sticky } from 'semantic-ui-react'
import ProfileTabReservations from './ProfileTabReservations';
import ProfileTabFavorites from './ProfileTabFavorites';
import ProfileTabAccountDetails from './ProfileTabAccountDetails';

import { useHistory, Switch, Route, NavLink, Redirect } from 'react-router-dom';

const ProfileTabs = () => {
    const [activeItem, setActiveItem] = useState('Reservations');
    const history = useHistory()
    const handleItemClick = (e, { name }) => {
        // if (name === 'Reservations') history.push('/profile')
        // else if (name === 'Saved Restaurants') history.push('/profile/favorites')
        // else if (name === 'Account Details') history.push('/profile/account-details')

        return setActiveItem(name);
    }
    return (
        <Grid >
            <Grid.Column width={4}>
                <Menu pointing vertical>
                    <Menu.Item
                        name='Reservations'
                        active={activeItem === 'Reservations'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='Saved Restaurants'
                        active={activeItem === 'Saved Restaurants'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='Account Details'
                        active={activeItem === 'Account Details'}
                        onClick={handleItemClick}
                    />
                </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
                {activeItem === 'Reservations' && <ProfileTabReservations />}
                {activeItem === 'Saved Restaurants' && <ProfileTabFavorites />}
                {activeItem === 'Account Details' && <ProfileTabAccountDetails />}
            </Grid.Column>
        </Grid>
    )
}

export default ProfileTabs;
