import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from './session.js';

// action types
const ADD_USER = 'users/ADD_USER';
const ADD_USERS = 'users/ADD_USERS';

// action creators
export const addUser = (user) => {
    return {
        type: ADD_USER,
        user
    }
}

export const addUsers = users => {
    return {
        type: ADD_USERS,
        users
    }
}

// thunk action creators
export const fetchUser = userId => async dispatch => {
    let res = await csrfFetch(`/api/users/${userId}`);

    if (res.ok) {
        let data = await res.json();
        dispatch(addUser(data.user))
    }
}

// reducer
const usersReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type){
        case ADD_USER:
            nextState[action.user.id] = action.user;
            return nextState;
        case ADD_USERS:
            return {...nextState, ...action.users}
        case REMOVE_CURRENT_USER:
            return ({});
        default:
            return state;
    }
}

export default usersReducer;
