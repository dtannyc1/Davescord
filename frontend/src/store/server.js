import { ADD_CHANNEL, addChannels } from "./channel";
import csrfFetch from "./csrf";
import { addMessages } from "./message";
import { REMOVE_CURRENT_USER } from './session.js';
import { addUsers } from "./user";

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
        let messages = {};
        let subscribers = {};

        // parse information about channels into its own slice of state
        if (data.channels){
            for (const [key, channel] of Object.entries(data.channels)){
                if (channel.messages) {
                    messages = {...messages, ...channel.messages};
                    data.channels[key].messages = Object.values(channel.messages).map(message => message.id)
                } else {
                    data.channels[key].messages = [];
                }
            }
        }

        // parse information about subscribers into its own slice of state
        if (data.subscribers) {
            subscribers = data.subscribers;
            data.subscribers = Object.values(data.subscribers).map(subscriber => subscriber.id)
        }

        // store info about channels, messages, and users separately
        dispatch(addUsers(subscribers))
        dispatch(addChannels(data.channels))
        dispatch(addMessages(messages))

        if (data.channels) {
            data.channels = Object.values(data.channels).map(channel => channel.id)
        }
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
        let messages = {};
        let subscribers = {};

        // parse information about channels into its own slice of state
        if (data.channels){
            for (const [key, channel] of Object.entries(data.channels)){
                if (channel.messages) {
                    messages = {...messages, ...channel.messages};
                    data.channels[key].messages = Object.values(channel.messages).map(message => message.id)
                } else {
                    data.channels[key].messages = [];
                }
            }
        }

        // parse information about subscribers into its own slice of state
        if (data.subscribers) {
            subscribers = data.subscribers;
            data.subscribers = Object.values(data.subscribers).map(subscriber => subscriber.id)
        }

        // store info about channels, messages, and users separately
        dispatch(addUsers(subscribers))
        dispatch(addChannels(data.channels))
        dispatch(addMessages(messages))

        if (data.channels) {
            data.channels = Object.values(data.channels).map(channel => channel.id)
        }
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
        let messages = {};
        let subscribers = {};

        // parse information about channels into its own slice of state
        if (data.channels){
            for (const [key, channel] of Object.entries(data.channels)){
                if (channel.messages) {
                    messages = {...messages, ...channel.messages};
                    data.channels[key].messages = Object.values(channel.messages).map(message => message.id)
                } else {
                    data.channels[key].messages = [];
                }
            }
        }

        // parse information about subscribers into its own slice of state
        if (data.subscribers) {
            subscribers = data.subscribers;
            data.subscribers = Object.values(data.subscribers).map(subscriber => subscriber.id)
        }

        // store info about channels, messages, and users separately
        dispatch(addUsers(subscribers))
        dispatch(addChannels(data.channels))
        dispatch(addMessages(messages))

        if (data.channels) {
            data.channels = Object.values(data.channels).map(channel => channel.id)
        }
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
        case ADD_CHANNEL:
            nextState[action.channel.serverId].channels ||= [];
            nextState[action.channel.serverId].channels.push(action.channel.id)
            return nextState;
        case REMOVE_CURRENT_USER:
            return ({});
        default:
            return state;
    }
}

export default serverReducer;
