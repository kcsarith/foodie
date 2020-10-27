import React, { useState } from "react";
import { signup } from '../store/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from "styled-components";



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

function SignUp() {

    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [city, setCity]= useState('Las Vegas');
    const [state, setState]= useState('NV');

    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.authentication.id);
    const location = `${city}, ${state}`;
    function handleChange(e){
        const { id, value } = e.target;
        switch (id) {
            case "name":
                setName(value);
            return;
            case "email":
                setEmail(value);
                return;
            case "password":
                setPassword(value);
                return;
            case "city":
                setCity(value);
                return;
            case "state":
                setState(value);
                return;
            default:
                return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password, location));
    }

    console.log(currentUserId)
    if (currentUserId) {
      return <Redirect to="/" />;
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
                                value={name}
                                placeholder="Please enter your name"
                                onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                                name= "email"
                                value={email}
                                placeholder="Please enter Email"
                                onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                                name="password"
                                placeholder="Please enter password"
                                value={password}
                        onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="location">Primary Dining Location</label>
                        <select value={location} name="location" placeholder="Select Side" onChange={handleChange}>
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
