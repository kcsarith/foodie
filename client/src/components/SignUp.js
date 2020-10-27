import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import back_img from "../foodie-apps.jpg";
import './LoginPanel.css';


const SignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 28px 10px 34px 10px;
  margin: 0 auto;
  text-align: center;
  h1 {
    display: block;
    width: 100%;
    text-align: center;
    color: #111111;
    background-color: transparent;
    font-size: 48px;
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
    padding: 20px
    margin: 20px
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
    padding: 10px 0px;
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
    font-size: 13px;   
    padding: 9px 4px; 
  }
`;

function SignUp(props) {
    const [person, setPerson]= useState({
        name: '',
        email:'',	
        password:'',
        location:"Las Vegas, NV"
    })

    const [location, setLocation] = useState({city:'', state:''})

    function handleChange(e){
        const { name, value } = e.target;
        setPerson(person => ({ ...person, [name]:value }))
    }

    let error=''
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password,location } = person;
        // const city=location.substring(0, location.length-4);
        // const state=location.substring(location.length-2);
        const {city, state} = location
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
        
        console.log("response::::", response);
        // Response {type: "basic", url: "http://localhost:3000/api/session/signup", redirected: false, status: 400, ok: false, …}
        if(response.status === 400){
            console.log('aaaa')
            error = 'Error message'   
        }

        ReactDOM.render(
                <React.StrictMode>
                <div>{error}</div>
            </React.StrictMode>,
            document.getElementById('error')
        );
     
    }

    // const options = [
    //     "Las Vegas, NV", "Birmingham, AL", "Huntsville , AL", "Montgomery, AL","Los Angeles, CA", "San Diego, CA", 
    //     "San Jose, CA","San Francisco, CA", "Newark, DE","Albuquerque, NM","Santa Fe, NM",
    //     "Boise, ID", "Meridian, ID", "Nampa, ID","Idaho Falls, ID", "New York City, NY","Dallas TX", "Houston, TX"
    //     ]

    const options = [
        {city:'', state:'NV'},
        {}
    ]

    return (
        <div  className="loginandsignup">
            <img className='login__image' src={back_img} alt="signup-image" />
            <SignUpFormWrapper>
            <h1>Welcome To Foodie!</h1>
            <div id="error"></div>
            <form name='form' onSubmit={handleSubmit}>
                <fieldset>
                     <div className="input-fields">
                        <label htmlFor="name">Name</label>
                        <input type="txt"
                                name= "name"
                                id = "name"
                                value={person.name}
                                placeholder="Please enter your name"
                                onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                                name= "email"
                                id ="email"
                                value={person.email}
                                placeholder="Please enter Email"
                                onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                                name="password"
                                id="password"
                                placeholder="Please enter password"
                                value={person.password}
                        onChange={handleChange} />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="location">Primary Dining Location</label>
                        <select value={person.location} name="location" id="location" onChange={handleChange}>
                            {options.map((value) => <option key={value} location={value}>{value}</option>)}
                        </select>
                    </div>
                    <br />
                    <div className="login-buttons">
                        <button type="submit">Register</button>    
                    <div>   
                        <div>Already a member?</div>
                        <a href="/login">Log In</a>
                    </div>
                    </div>
                </fieldset>
            </form>
            </SignUpFormWrapper>
        </div>
    )
}
export default SignUp;