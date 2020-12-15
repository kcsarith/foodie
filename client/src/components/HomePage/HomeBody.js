import React, { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import './HomeBody.css'
import { useSelector } from 'react-redux';


function HomeBody({ data }) {

    const authSelector = useSelector(state => state.authentication)
    const [homeBodyVisual, setHomeBodyVisual] = useState({
        favorites: [],
    })
    const [restData, setRestData] = useState([])

    const findKeyValueInObjectArrayExists = (rest) => {
        if (homeBodyVisual.favorites.length) {
            for (let i = 0; i < homeBodyVisual.favorites.length; i++) {
                const ele = homeBodyVisual.favorites[i];
                if (ele.id === rest.id) {
                    return true;
                }
            }
            return false;
        }
    }
    useEffect(() => {
        async function fetchData() {

            if (authSelector.id) {
                const res = await fetch(`/api/home/${authSelector.id}`)
                const data = await res.json()
                await setRestData(data.restaurants)

                const res2 = await fetch(`/api/users/${authSelector.id}/favorites`)
                const data2 = await res2.json()

                setHomeBodyVisual({ ...homeBodyVisual, favorites: data2.favorites })
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const restComponents = data.map((rest) => {
        const favorited = findKeyValueInObjectArrayExists(rest);
        return <RestaurantCard key={rest.id} favorited={favorited} homeBodyVisual={homeBodyVisual} setHomeBodyVisual={setHomeBodyVisual} rest={rest} />
    })

    return (
        <div className='restaurants-list'>
            { data.length === 0 ? <h3>Search for Restaurants in your area!</h3> : restComponents}
        </div>

    );
};


export default HomeBody
