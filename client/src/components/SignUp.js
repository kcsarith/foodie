import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelecor } from 'react-redux';

import { userAction } from '../actions';


function SignUp() {
    const [user, setUser]= useState({
        name: '',
        email:'',	
        city:'',	
        state:'',	
        password:''	
    })}

    function handleChange(e){
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]:value }))
    }

    function handleSubmit(e){
        e.preventDefault();
        const { name, email, city, state, password } = user;
        const response = await fetch("")

    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form name='form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type='text' name='name' value={user.name} onChang={handleChange}> 
                </div>
            </form>
        </div>
    )