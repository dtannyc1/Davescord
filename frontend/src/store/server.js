import csrfFetch from "./csrf";

// action types
const ADD_SERVERS = 'servers/ADD_SERVERS';
// const REMOVE_SERVERS = 'servers/REMOVE_SERVERS';

// action creators
const addServers = servers => {
    return ({
        type: ADD_SERVERS,
        servers
    })
}
// thunk action creators
export const fetchServers = () => async dispatch => {
    let res = await csrfFetch('/api/servers')

    if (res.ok) {
        let data = await res.json();
        dispatch(addServers(data.servers))
    }
}


// reducer
const serverReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case ADD_SERVERS:
            return {...nextState, ...action.servers}
        default:
            return state;
    }
}

export default serverReducer;
