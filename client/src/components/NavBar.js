import React from 'react';
import styled from 'styled-components';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authentication';
import { useHistory, Redirect } from 'react-router-dom';
import FastfoodIcon from '@material-ui/icons/Fastfood';

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

const NavBar = () => {
    const authSelector = useSelector(state => state.authentication)
    const loggedOut = authSelector.id;
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }
    const handleClickHome = () => {
        history.push('/')
    }

    const handleProfile = (e, { name }) => {
        history.push('/profile')
    }

    const history = useHistory()

    if (!loggedOut) {
        return <Redirect to="/login" />;
    }

    return (
        <NavBarWrapper>
            <Menu fixed='top' inverted >
                <Container className="nav-bar-content">
                    <Menu.Item onClick={handleClickHome}>
                        <FastfoodIcon /> Home</Menu.Item>
                    <Menu.Item onClick={handleClickHome} header>
                        <Image size='mini' src='https://cdn2.iconfinder.com/data/icons/flat-pro-word-processing-set-5/32/table-512.png' style={{ marginRight: '1.5em' }} />
                        FOODIE
                    </Menu.Item>
                    {authSelector.name &&
                        <Dropdown item text={`Hi ${authSelector.name}`}>
                            <Dropdown.Menu>
                                <Dropdown.Header style={{ fontSize: '16px' }}>You have {authSelector.points}/2000 points!</Dropdown.Header>
                                <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}
                    {!authSelector.name && <Menu.Item>Login</Menu.Item>}
                </Container>
            </Menu>
        </NavBarWrapper>
    )
}

export default NavBar;
