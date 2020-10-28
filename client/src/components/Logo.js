import React from 'react';
import { NavLink } from 'react-router-dom';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const Logo = () => {
    return (
        <NavLink
            to="/"
            style={{
                color: 'black',
                textDecoration: 'none',
                fontSize: '15px',
                width: '140px',
                height: '50px',
                margin: "0 0 0 15px",
                display: "inline-block",
                fontWeight: "bold",
                fontFamily: '"Lato", "Helvetica Neue", "Helvetica", sans-serif',
                textAlign: "center",
                lineHeight: "50px"
            }}
        >
            <FastfoodIcon />
        </NavLink>
    );
};

export default Logo;
