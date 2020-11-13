import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route, Redirect } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
//import UserList from './components/UsersList';
//import { getUserInfo } from './store/currentUser';
import HomePage from './components/HomePage/HomePage'
import RestaurantProfile from './components/RestaurantProfile/RestaurantProfile';
import { setCsrfFunc } from './store/authentication';
import Script from 'react-load-script'
import { requirePropFactory } from '@material-ui/core';
require('dotenv').config()


const PrivateRoute = ({ component: Component, ...rest }) => {
    let needLogin = useSelector(state => !state.authentication.id);
    return (
        <Route {...rest} render={(props) => (
            needLogin
                ? <Redirect to='/login' />
                : <Component {...props} />
        )} />
    )
}

function App() {
    //let currentUserId = useSelector(state => state.authentication.id);
    let location = useLocation();
    let dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getUserInfo(currentUserId));
    // }, [currentUserId, dispatch])
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const [scriptLoaded, setScriptLoaded] = useState(false)
    const [scriptError, setScriptError] = useState(true)

    const handleScriptCreate = () => {
        setScriptLoaded(false)
    }

    const handleScriptError = () => {
        setScriptError(true)
    }

    const handleScriptLoad = () => {
        setScriptLoaded(true)
    }



    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
            }
        }
        restoreCSRF();
    }, []);


    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);

    console.log(process)
    return (
        <>
            <Script
                url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
                onCreate={handleScriptCreate}
                onError={handleScriptError}
                onLoad={handleScriptLoad}>
            </Script>

            {
                location.pathname !== '/login' && location.pathname !== '/signup' ?
                    <NavBar />
                    : null
            }
            <Switch>
                <Route path="/login" component={LoginPanel} />
                <PrivateRoute
                    path="/profile"
                    exact={true}
                    component={Profile}
                />
                <Route
                    path="/signup"
                    exact={true}
                    component={SignUp}
                />
                <Route
                    path="/"
                    exact={true}
                    component={HomePage}
                />
                <Route
                    path='/restaurant/profile/:id'
                    exact={true}
                    component={RestaurantProfile}
                />

            </Switch>
        </>
    );
}

export default App;
