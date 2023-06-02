import { addChannels } from "./channel";
import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from './session.js';

// action types
export const ADD_SERVER = 'servers/ADD_SERVER';
const ADD_SERVERS = 'servers/ADD_SERVERS';
const REMOVE_SERVER = 'servers/REMOVE_SERVER';

// action creators
export const addServer = server => {
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

export const removeServer = serverId => {
    return ({
        type: REMOVE_SERVER,
        serverId
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

export const fetchServer = (serverId) => async dispatch => {
    let res = await csrfFetch(`/api/servers/${serverId}`)

    if (res.ok) {
        let data = await res.json();
        dispatch(addChannels(data.channels))
        data.channels = Object.values(data.channels).map(channel => channel.id)
        dispatch(addServer(data))
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

export const updateServer = (server) => async dispatch => {
    let res = await csrfFetch(`/api/servers/${server.id}`, {
        method: "PATCH",
        body: JSON.stringify({server: server})
    })

    if (res.ok) {
        let data = await res.json();
        dispatch(addServer(data))
        return data
    }
}

export const destroyServer = (serverId) => async dispatch => {
    let res = await csrfFetch(`/api/servers/${serverId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeServer(serverId))
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
        case REMOVE_SERVER:
            delete nextState[action.serverId];
            return nextState;
        case REMOVE_CURRENT_USER:
            return ({});
        default:
            return state;
    }
}

export default serverReducer;
