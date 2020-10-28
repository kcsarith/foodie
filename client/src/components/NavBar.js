import React from 'react';
import AuthNavButtons from './AuthNavButtons';
import Logo from './Logo';
import NavBarButtons from './NavBarButtons';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const NavBarWrapper = styled.div`
  margin: 0;
  background-color: #da3743;
  padding: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  display: block;
  .nav-bar-content {
    margin: 0 auto;
    display: flex;
    width: 1220px;
    height: 50px;
  }
`;

const NavBar = () => {
    return (
        <nav>
            <NavBarWrapper>
                <div className="nav-bar-content">
                    <Logo />
                    <NavBarButtons />
                    <AuthNavButtons />
                </div>
            </NavBarWrapper>
        </nav>
    )
};

export default NavBar;
