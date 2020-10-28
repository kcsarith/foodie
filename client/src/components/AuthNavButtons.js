import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBarLink from './NavBarLink';
import { logout } from '../store/authentication';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const AuthNavButtonsWrapper = styled.div`
  display: flex;
  vertical-align: top;
  margin: 0 15px;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  .button {
    font-size: 16px;
    padding: 12px 24px;
    appearance: none;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    background-color: #da3743;
    color: white;
    line-height: 50px;
    font-weight: bold;
    font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
    padding: 0 15px;
    border: none;
  }
  .button:hover {
    color: #FFFFFF;
    background-color: black;
    opactiy: 0.8;
    outline: 0;
  }
`;

const AuthNavButtons = () => {
    const loggedOut = useSelector(state => !state.authentication.id);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }

    if (loggedOut) {
        return <Redirect to="/login" />;
    }

    return (
        <AuthNavButtonsWrapper>
            <NavBarLink
                path={'/profile'}
                text={'Profile'}
            />
            <button className="button" onClick={handleLogout}>Logout</button>
        </AuthNavButtonsWrapper>
    )
};

export default AuthNavButtons;
