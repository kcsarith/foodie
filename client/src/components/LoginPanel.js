import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authentication';
import styled from "styled-components";
import './LoginPanel.css'

const LoginFormWrapper = styled.div`
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
    padding: 20px;
    margin: 20px;
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
    padding: 20px 0px;
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
  .login-signup {
    font-family: "Lato", "Helvetica Neue", Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 24px;
    display: block;
  }
  a {
    margin-left: 10px;
    font-weight: normal;
    color: #00635d;
    text-decoration: none;
    cursor: pointer;
  }

  button:hover {
      opacity: 0.7;
  }
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.authentication.id);

    const handleLogIn = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const handleDemoLogIn = (e) => {
        e.preventDefault();
        const demoEmail = 'demo@example.com';
        const demoPassword = 'password';
        dispatch(login(demoEmail, demoPassword));
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "email":
                setEmail(value);
                return;
            case "password":
                setPassword(value);
                return;
            default:
                return;
        }
    }

    if (currentUserId) {
        return <Redirect to="/" />;
    }


    return (

        <div className="loginandsignup">
            <img className='login__image' src='https://images.unsplash.com/photo-1508213824875-83a3d36e72a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' alt='' />
            <LoginFormWrapper>
                <div className="login">
                    <h1>Sign in</h1>
                    <form onSubmit={handleLogIn}>
                        <fieldset>
                            <div className="input-fields">
                                <label htmlFor="email">Email address</label>
                                <input type="email"
                                    id="email"
                                    placeholder="you@yours.com"
                                    onChange={handleChange} />
                            </div>
                            <div className="input-fields">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    onChange={handleChange} />
                            </div>
                            <div className="login-spacer"></div>
                            <div className="login-submit">
                                <div className="login-buttons">
                                    <button type="submit">Sign in</button>
                                    <button className="demouser" onClick={handleDemoLogIn}>Demo User</button>
                                </div>
                                <div className="login-signup">
                                    <span>
                                        <span>Not a member?</span>
                                        <a href="/signup">Sign up</a>
                                    </span>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </LoginFormWrapper>

        </div>
    );
}

export default Login;
