import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from './session.js';

// action types
const ADD_USER = 'users/ADD_USER';

// action creators
export const addUser = (user) => {
    return {
        type: ADD_USER,
        user
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
        case REMOVE_CURRENT_USER:
            return ({});
        default:
            return state;
    }
}

export default usersReducer;
