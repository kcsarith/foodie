import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelecor } from 'react-redux';
import styled from "styled-components";

//import { userAction } from '../actions';

const SignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 600px;
  padding: 28px 10px 34px 10px;
  border: 1px solid #d0d0c8;
  border-radius: 4px;
  box-shadow: 0px 1px 1px #d0d0c8;
  margin: 0 auto;
  background-color: white;
  text-align: center;
  h1 {
    display: block;
    width: 100%;
    text-align: center;
    color: #382110;
    background-color: transparent;
    font-size: 20px;
    font-family: "Merriweather", Georgia, 'Times New Roman', serif;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 0;
    line-height: 24px;
  }
  form {
    display: flex;
    flex-direction: column;
    width: auto;
    color: #030303
  }
  fieldset {
    border: none;
    width: 300px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
  }
  .input-fields {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    font-family: "Lato", "Helvetica Neue", Arial, Helvetica, sans-serif;
    color: #030303;
  }
  label {
    box-sizing: border-box;
    text-align: left;
    font-weight: bold;
    width: 100%;
    vertical-align: middle;
  }
  input {
    box-sizing: border-box;
    font-size: 15px;
    padding: 10px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-weight: bold;
    width: 300px;
    background: #FFFFFF;
  }
  .login-spacer {
    height: 10px;
  }
  .login-submit {
    margin-top: 20px;
    color: #333;
  }
  button {
    font-size: 16px;
    padding: 12px 24px;
    border-radius: 3px;
    border: 1px solid #d6d0c4;
    appearance: none;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: #333333;
    background-color: #f4f1ea;
    line-height: 1;
    font-weight: bold;
  }
  .login-buttons {
    display: flex;
    justify-content: space-between;
  }
  a {
    margin-left: 10px;
    font-weight: normal;
    color: #00635d;
    text-decoration: none;
    cursor: pointer;
  }
  select {
    font-size: 15px;   
    padding: 10px 4px; 
  }
`;

function SignUp(props) {
    const [person, setPerson]= useState({
        name: '',
        email:'',	
        password:'',
        location:"Las Vegas, NV"
    })

    function handleChange(e){
        const { name, value } = e.target;
        setPerson(person => ({ ...person, [name]:value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('person:::::', person)
        const { name, email, password,location } = person;
        const city=location.substring(0, location.length-4);
        const state=location.substring(location.length-2);
        const response = await fetch("/api/session/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
                city,
                state
             }),
        })
        
        if (response.ok) {
            props.history.push("/")
        }
    }

    const options = [
        "Las Vegas, NV", "Birmingham, AL", "Huntsville , AL", "Montgomery, AL","Los Angeles, CA", "San Diego, CA", "San Jose, CA","San Francisco, CA",
        "Boise, ID", "Meridian, ID", "Nampa, ID","Idaho Falls, ID", "New York City, NY"
        ]


    return (
        <div>
            <SignUpFormWrapper>
            <h2>Welcome To Foodie!</h2>
            <form name='form' onSubmit={handleSubmit}>
                <fieldset>
                     <div className="input-fields">
                        <label htmlFor="name">Name</label>
                        <input type="txt"
                                name= "name"
                                value={person.name}
                                placeholder="Please enter your name"
                                onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                                name= "email"
                                value={person.email}
                                placeholder="Please enter Email"
                                onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                                name="password"
                                placeholder="Please enter password"
                                value={person.password}
                        onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="location">Primary Dining Location</label>
                        <select value={person.location} name="location" placeholder="Select Side" onChange={handleChange}>
                            {options.map((value) => <option key={value} location={value}>{value}</option>)}
                        </select>
                    </div>
                    <br />
                    <div className="login-buttons">
                        <button type="submit">Register</button>
                    </div>
                </fieldset>
            </form>
            </SignUpFormWrapper>
        </div>
    )
}
export default SignUp;