import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';

const NavBarLinkWrapper = styled.div`
  .link {
    font-size: 16px;
    appearance: none;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: white;
    line-height: 50px;
    font-weight: bold;
    font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  }
  .link:hover {
    color: #FFFFFF;
    background-color: black;
    opacity: 0.8;
    outline: 0;
  }
`;


const NavBarLink = (props) => {
    return (
        <NavBarLinkWrapper>
            <NavLink
                className='link'
                onClick={props.handle}
                to={props.path ? props.path : null}
            >
                {props.text}
            </NavLink>
        </NavBarLinkWrapper >
    )
}

export default NavBarLink;
