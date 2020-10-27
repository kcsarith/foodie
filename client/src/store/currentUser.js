const SET_USER = 'FOODIE/CURRENTUSER/SET_USER';

export const setUser = user => {
  return {
    type: SET_USER,
    user
  }
}

export const getUserInfo = (id) => {
  return async dispatch => {
    const response = await fetch(`/api/users/${id}/profile`);
    if (response.ok) {
      const user = await response.json();
      dispatch(setUser(user));
    } else {
      const error = await response.json();
      window.alert(error.message);
    }
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
