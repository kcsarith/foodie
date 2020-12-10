import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route, Redirect } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import HomePage from './components/HomePage/HomePage'
import RestaurantProfile from './components/RestaurantProfile/RestaurantProfile';
import { loadUser, setCsrfFunc } from './store/authentication';
require('dotenv').config()


const PrivateRoute = ({ component: Component, ...rest }) => {

    const needLogin = useSelector(state => !state.authentication.id);

    if (needLogin === undefined) {
        return <h1>loading...</h1>
    }
    return (
        <>
            <Route {...rest} render={(props) => (
                needLogin
                    ? <Redirect to='/login' />
                    : <Component {...props} />
            )} />
        </>
    )
}

function App() {

    const location = useLocation();
    const dispatch = useDispatch();
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const loadCurrentUser = () => dispatch(loadUser())


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
        loadCurrentUser()
        restoreCSRF();
    }, []);

    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);

    return (
        <>

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
