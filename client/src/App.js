import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, useLocation, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import LoginPanel from './components/LoginPanel';
//import NavBar from './components/NavBar';
import Profile from './components/Profile';
import UserList from './components/UsersList';
import { getUserInfo } from './store/currentUser';

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
  //let location = useLocation();
  let dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getUserInfo(currentUserId));
  // }, [currentUserId, dispatch])


  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                <li><NavLink to="/signup" activeclass="active">Sign Up</NavLink></li>
            </ul>
        </nav>
        {/* {location.pathname !== '/login' && location.pathname !== '/signup' ?
            <NavBar />
            : null} */}
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
            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
