import Cookies from 'js-cookie'

const SET_USER = 'FOODIE/AUTH/SET_USER'
const REMOVE_USER = 'FOODIE/AUTH/REMOVE_USER'


export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}


export const removeUser = (user) => {
    return {
        type: REMOVE_USER,
    }
}

export const logout = () => dispatch => {
    fetch(`/api/session/logout`, {
        method: 'POST'
    }).then(() => dispatch(removeUser()));
}

function loadUser() {
    const authToken = Cookies.get("token");
    if (authToken) {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return data;
        } catch (e) {
            Cookies.remove("token");
        }
    }
    return {};
}

export const login = (email, password) => {
  return async (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    const res = await fetchWithCSRF('/api/session/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    if(res.ok) {
      const { user } = await res.json();
      user.csrf = fetchWithCSRF;
      dispatch(setUser(user));
    }
  }
}

export const signup = (name, email, password) => {
    return async dispatch => {
        const res = await fetch('/api/session/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user))
        }
    }
}

const initialState = {
  ...loadUser(),
  csrf: null,
}

export default function reducer(state=initialState, action) {
  switch(action.type){
    case SET_USER:
        return action.user
    case REMOVE_USER:
        return {}
    default:
        return state
  }
}
