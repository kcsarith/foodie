
import React, { useState } from 'react';
import './HomePage.css'
import Footer from '../Footer';
import 'semantic-ui-css/semantic.min.css'
import HomeBody from './HomeBody';
import { useSelector } from 'react-redux';
import './SearchInput.css'
import SearchSharpIcon from '@material-ui/icons/SearchSharp';


function HomePage() {

    const fetchWithCSRF = useSelector(state => state.authentication.csrf);

    const [term, setTerm] = useState([]);
    const [restData, setRestData] = useState([])

    const updateTerm = (e) => {
        setTerm(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        searchRestaurants();
    }

    async function searchRestaurants() {

        const res = await fetchWithCSRF("/api/home/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ term }),
        });
        if (res.ok) {
            const data = await res.json()
            setRestData(data.restaurants)
            return
        }
    }

    return (
        <>
            <div className='home'>
                <div className='home-search'>
                    <form onSubmit={handleSubmit} className='home-search__form'>
                        <input onChange={updateTerm} type='text' name="search" value={term} placeholder='Name, Address, City, State' />
                        <button className='home__button' type='submit'>Let's Go!</button>
                    </form>
                    <span className='home-search__icon'>
                        <SearchSharpIcon />
                    </span>
                </div>
                <div className='home__img'>
                    <img src='https://images.unsplash.com/photo-1574936145840-28808d77a0b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80' alt='' />
                </div>
                <div className='home__body'>
                    <HomeBody data={restData} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default HomePage
