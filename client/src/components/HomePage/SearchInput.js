import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './SearchInput.css'
import SearchSharpIcon from '@material-ui/icons/SearchSharp';

function SearchInput() {
    const fetchWithCSRF = useSelector(state => state.authentication.csrf);

    const [term, setTerm] = useState([]);
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
          return data.restaurants
        }
    }


    return (
        <div className='home-search'>
            <form onSubmit={handleSubmit}>
                <input onChange={updateTerm} type='text' name="search" value={term} placeholder='Name, Address, City, State'/>
                <button className='home__button' type='submit'>Let's Go!</button>
            </form>
            <span className='home-search__icon'>
                <SearchSharpIcon />
            </span>
        </div>
    )

}

export default SearchInput
