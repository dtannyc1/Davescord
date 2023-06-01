import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from './session.js';

// action types
const ADD_SERVER = 'servers/ADD_SERVER';
const ADD_SERVERS = 'servers/ADD_SERVERS';
// const REMOVE_SERVERS = 'servers/REMOVE_SERVERS';

// action creators
const addServer = server => {
    return ({
        type: ADD_SERVER,
        server
    })
}

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

export const createServer = (server) => async dispatch => {
    let res = await csrfFetch('/api/servers', {
        method: "POST",
        body: JSON.stringify(server)
    })

    if (res.ok) {
        let data = await res.json();
        dispatch(addServer(data))
        return data
    }
}

// reducer
const serverReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case ADD_SERVER:
            nextState[action.server.id] = action.server;
            return nextState;
        case ADD_SERVERS:
            return {...nextState, ...action.servers};
        case REMOVE_CURRENT_USER:
            return ({});
        default:
            return state;
    }
}

export default serverReducer;
