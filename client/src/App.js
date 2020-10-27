import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import UserList from './components/UsersList';
import { getUserInfo } from './store/currentUser';
import HomePage from './components/HomePage/HomePage'

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

    let currentUserId = useSelector(state => state.authentication.id);
    let location = useLocation();
    let dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getUserInfo(currentUserId));
    // }, [currentUserId, dispatch])

    return (
        <>
            {location.pathname !== '/login' && location.pathname !== '/signup' ?
                <NavBar />
                : null}
            <Switch>
                <Route path="/login" component={LoginPanel} />
                <PrivateRoute
                    path="/users"
                    exact={true}
                    component={UserList}
                />
                <PrivateRoute
                    path="/profile"
                    exact={true}
                    component={Profile}
                />
                <Route path="/signup" component={SignUp} />
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
