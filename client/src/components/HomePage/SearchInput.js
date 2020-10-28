import React from 'react'
import './SearchInput.css'
import SearchSharpIcon from '@material-ui/icons/SearchSharp';

function SearchInput() {

    return (
        <div className='home-search'>
            <input type='text' placeholder='City, State' />
            <span className='home-search__icon'>
                <SearchSharpIcon />
            </span>
        </div>
    )

}

export default SearchInput
