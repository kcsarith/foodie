import Cookies from 'js-cookie'

const SET_USER = 'FOODIE/AUTH/SET_USER'
const REMOVE_USER = 'FOODIE/AUTH/REMOVE_USER'
const SET_CSRF = 'FOODIE/AUTH/SET_CSRF'
const ERROR_MSG = 'ERROR_MSG'
const SET_POINTS = 'SET_POINTS'

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const setCsrfFunc = (cb) => {
    return {
        type: SET_CSRF,
        cb
    }
}


export const removeUser = (user) => {
    return {
        type: REMOVE_USER,
    }
}

export const logout = () => (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    fetchWithCSRF(`/api/session/logout`, {
        method: 'POST'
    }).then(() => dispatch(removeUser()));
}

function loadUser() {
    const authToken = Cookies.get("session");
    if (authToken) {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return data;
        } catch (e) {
            Cookies.remove("session");
        }
    }
    return {};
}

export const login = (email, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authentication.csrf;
        const res = await fetchWithCSRF('/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user));
        }

    }
}


// yongho
export const error = (message) => {
    return { type: ERROR_MSG, message };
}

export const setPoints = (points) => {
    return { type: SET_POINTS, points}
}

export const signup = (name, email, password, city, state, points) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authentication.csrf;
        const res = await fetchWithCSRF('/api/session/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, city, state, points })
        })

        if (res.status === 400) {
            const { errors } = await res.json();
            dispatch(error(errors))
        }

        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user))
        }

    }
}

export const patchUser = (formState) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authentication.csrf;
        const res = await fetchWithCSRF(`/api/users/${formState.id}/patch`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState)
        })

        if (res.status === 400) {
            const { errors } = await res.json();
            dispatch(error(errors))
            return res;
        }

        if (res.ok) {
            const { user, errors } = await res.json();
            dispatch(setUser(user))
            return { res, user, errors };
        }

    }
}

const initialState = {
    ...loadUser(),
    csrf: fetch,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.user }
        case SET_CSRF:
            return { ...state, csrf: action.cb }
        case REMOVE_USER:
            return { csrf: state.csrf }
        case ERROR_MSG:
            return { ...state, error: action.message }
        case SET_POINTS:
            return { ...state, points: action.points}
        default:
            return state
    }
}
