
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
            <Script
                url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
                onCreate={handleScriptCreate}
                onError={handleScriptError}
                onLoad={handleScriptLoad}>
            </Script>
            <div className='home'>
                <SearchInput csrf={fetchWithCSRF} />
                <Footer />
            </div>
        </>
    )
}

export default HomePage
