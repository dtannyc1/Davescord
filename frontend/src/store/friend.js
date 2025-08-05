import csrfFetch from "./csrf";
import { addUsers } from "./user";

// action types
const ADD_FRIEND = 'friends/ADD_FRIEND';
const ADD_FRIENDS = 'friends/ADD_FRIENDS';
const REMOVE_FRIEND = 'friends/REMOVE_FRIEND';

// action creators
export const addFriend = friend => {
    return {
        type: ADD_FRIEND,
        friend
    }
}

export const addFriends = friends => {
    return {
        type: ADD_FRIENDS,
        friends
    }
}

export const removeFriend = friendId => {
    return {
        type: REMOVE_FRIEND,
        friendId
    }
}

// thunk action creators
export const fetchFriends = () => async dispatch => {
    let res = await csrfFetch('/api/friends')

    if (res.ok){
        let data = await res.json();
        dispatch(addFriends(data.friends));
        dispatch(addUsers(data.users));
    }
}


// reducer
const friendsReducer = (state = {}, action) => {
    let nextState = {...state};

    switch (action.type){
        case ADD_FRIEND:
            nextState[action.friend.id] = action.friend;
            return nextState;
        case ADD_FRIENDS:
            return {...action.friends};
        case REMOVE_FRIEND:
            delete nextState[action.friendId]
            return nextState;
        default:
            return state;
    }
}

export default friendsReducer;
