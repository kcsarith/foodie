
import React from 'react';
import TimePickers from './TimePicker'
import './HomePage.css'
import SearchInput from './SearchInput'
import Footer from '../Footer';
import 'semantic-ui-css/semantic.min.css'

function HomePage() {
    return (
        <>
            <div className='home'>
                <div className='home__selectors'>
                    <div className='home__date'>
                        <input className="home__dateInput" type="date" />
                    </div>
                    <div className='home__time'>
                        <TimePickers />
                    </div>
                    <div className='home__group'>
                        <select className='home__groupSelect' label='2 People' defaultValue='2 People' >
                            <option> 2 People</option>
                            <option> 3 People</option>
                            <option> 4 People</option>
                            <option> 5 People</option>
                            <option> 6 People</option>
                            <option> 7 People</option>
                            <option> 8 People</option>
                            <option> 9 People</option>
                            <option> 10 People</option>
                        </select>
                    </div>
                    <SearchInput />
                </div>
                <div className='home__img'>
                    <img src='https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomePage