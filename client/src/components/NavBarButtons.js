import React from 'react';
import NavBarLink from './NavBarLink';
import styled from 'styled-components';
import './NavBar.css'

const NavBarButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  vertical-align: top;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
`;

const NavBarButtons = () => {
    return (
        <NavBarButtonsWrapper>
            <NavBarLink
                className='home-btn'
                path={'/'}
                text={"Home"} />
        </NavBarButtonsWrapper>
    )
}

export default NavBarButtons;
