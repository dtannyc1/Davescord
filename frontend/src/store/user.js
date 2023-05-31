import csrfFetch from "./csrf";

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
        default:
            return state;
    }
}

export default usersReducer;
