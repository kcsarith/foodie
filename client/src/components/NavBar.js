import React from 'react';
import AuthNavButtons from './AuthNavButtons';
import Logo from './Logo';
import NavBarButtons from './NavBarButtons';
import styled from 'styled-components';
import { Container, Dropdown, Image, Header, Menu } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authentication';
import { useHistory, Redirect } from 'react-router-dom';
import './NavBar.css';

const NavBarWrapper = styled.div`
  margin: 0;
  background-color: #da3743;
  padding: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  display: flex;
  .nav-bar-content {
    margin: 0 auto;
    display: flex;
    height: 50px;
  }
`;

const NavBar2 = () => {
    return (
        <nav>
            <NavBarWrapper>
                <div className="nav-bar-content">
                    <div>
                        <Logo />
                        <NavBarButtons />
                    </div>
                    {/* <Header as='h2' icon textAlign='center'>
                        <Image src='https://cdn2.iconfinder.com/data/icons/flat-pro-word-processing-set-5/32/table-512.png' size='mini' circular />
                        <Header.Content>Foodie</Header.Content>
                    </Header> */}
                    FOODIE
                    <AuthNavButtons />
                </div>
            </NavBarWrapper>
        </nav>
    )
};

const NavBar = () => {
    const authSelector = useSelector(state => state.authentication)
    console.log(authSelector)
    const loggedOut = authSelector.id;
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }

    const handleProfile = (e, { name }) => {
        if (name === 'Reservations') history.push('/profile')
        else if (name === 'Saved Restaurants') history.push('/profile')
        else if (name === 'Account Details') history.push('/profile')
    }

    const history = useHistory()

    if (!loggedOut) {
        return <Redirect to="/login" />;
    }

    return (
        <NavBarWrapper>
            <Menu fixed='top' inverted >
                <Container className="nav-bar-content">
                    <Menu.Item as='a'>
                        <Logo />  Home</Menu.Item>
                    <Menu.Item as='a' header>
                        <Image size='mini' src='https://cdn2.iconfinder.com/data/icons/flat-pro-word-processing-set-5/32/table-512.png' style={{ marginRight: '1.5em' }} />
                        FOODIE
                    </Menu.Item>
                    {authSelector.name && <Dropdown item simple text={`Hi ${authSelector.name}`}>
                        <Dropdown.Menu>
                            <Dropdown.Header>You have 845/2000 points!</Dropdown.Header>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Profile</Dropdown.Header>
                            {/* <Dropdown.Item name='Reservations' onClick={handleProfile}>Reservations</Dropdown.Item>
                            <Dropdown.Item name='Saved Restaurants' onClick={handleProfile}>Favorites</Dropdown.Item> */}
                            <Dropdown.Item name='Account Details' onClick={handleProfile}>Account Details</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    {!authSelector.name && <Menu.Item>Login</Menu.Item>}
                </Container>
            </Menu>
        </NavBarWrapper>
    )
}

export default NavBar;
