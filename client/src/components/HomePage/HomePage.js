
import React, { useState } from 'react';
import './HomePage.css'
import Footer from '../Footer';
import 'semantic-ui-css/semantic.min.css'
import { useSelector } from 'react-redux';
import './SearchInput.css'
import SearchInput from './SearchInput';
import Script from 'react-load-script'
require('dotenv').config()

function HomePage() {

    const fetchWithCSRF = useSelector(state => state.authentication.csrf);
    const [scriptLoaded, setScriptLoaded] = useState(false)
    const [scriptError, setScriptError] = useState(true)
    const handleScriptCreate = () => {
        setScriptLoaded(false)
        return scriptLoaded
    }

    const handleScriptError = () => {
        setScriptError(true)
        return scriptError
    }

    const handleScriptLoad = () => {
        setScriptLoaded(true)
    }

    return (
        <>
            <div className='home'>
                {/* <SearchInput csrf={fetchWithCSRF} /> */}
                <Footer />
            </div>
        </>
    )
}

export default HomePage
