
import React from 'react';
import TimePickers from './TimePicker'
import './HomePage.css'

function HomePage() {
    return (
        <div className='home'>
            <div className='home__selectors'>
                <div className='home__date'>
                    <input type="date" />
                </div>
                <div className='home__time'>
                    <TimePickers />
                </div>
                <div className='home__group'>
                    <select label='2 People' defaultValue='2 People' >
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
            </div>
            <img className='home__img' src='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' />
        </div>
    )
}

export default HomePage
