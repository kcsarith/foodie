
import React, { useState } from 'react';
import './HomePage.css'
import Footer from '../Footer';
import 'semantic-ui-css/semantic.min.css'
import { useSelector } from 'react-redux';
import './SearchInput.css'
import SearchInput from './SearchInput';
require('dotenv').config()

function HomePage() {

    const fetchWithCSRF = useSelector(state => state.authentication.csrf);

    return (
        <>
            <div className='home'>
                <SearchInput csrf={fetchWithCSRF} />
                <Footer />
            </div>
        </>
    )
}

export default HomePage
