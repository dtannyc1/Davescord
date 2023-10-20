
// action types
const SET_UNREAD_SERVER = 'unread/SET_UNREAD_SERVER';
const SET_UNREAD_CHANNEL = 'unread/SET_UNREAD_CHANNEL';
const SET_UNREAD_PRIVATE_CHAT = 'unread/SET_UNREAD_PRIVATE_CHAT';
const REMOVE_UNREAD_SERVER = 'unread/REMOVE_UNREAD_SERVER';
const REMOVE_UNREAD_CHANNEL = 'unread/REMOVE_UNREAD_CHANNEL';
const REMOVE_UNREAD_PRIVATE_CHAT = 'unread/REMOVE_UNREAD_PRIVATE_CHAT';

// action creators
export const setUnreadServer = (serverId) => {
    return {
        type: SET_UNREAD_SERVER,
        serverId
    }
}

export const setUnreadChannel = (channelId) => {
    return {
        type: SET_UNREAD_CHANNEL,
        channelId
    }
}

export const setUnreadPrivateChat = (privateChatId) => {
    return {
        type: SET_UNREAD_PRIVATE_CHAT,
        privateChatId
    }
}

export const removeUnreadServer = (serverId) => {
    return {
        type: REMOVE_UNREAD_SERVER,
        serverId
    }
}

export const removeUnreadChannel = (channelId) => {
    return {
        type: REMOVE_UNREAD_CHANNEL,
        channelId
    }
}

export const removeUnreadPrivateChat = (privateChatId) => {
    return {
        type: REMOVE_UNREAD_PRIVATE_CHAT,
        privateChatId
    }
}

// thunk actions

// reducer
const initialState = {servers: {}, channels: {}, privateChats: {}}
const unreadReducer = (state = initialState, action) => {
    let nextState = {...state};
    switch (action.type) {
        case SET_UNREAD_SERVER:
            nextState.servers[action.serverId] = true;
            return nextState;
        case SET_UNREAD_CHANNEL:
            nextState.channels[action.channelId] = true;
            return nextState;
        case SET_UNREAD_PRIVATE_CHAT:
            nextState.privateChats[action.privateChatId] = true;
            return nextState;
        case REMOVE_UNREAD_SERVER:
            delete nextState.servers[action.serverId];
            return nextState;
        case REMOVE_UNREAD_CHANNEL:
            delete nextState.channels[action.channelId];
            return nextState;
        case REMOVE_UNREAD_PRIVATE_CHAT:
            delete nextState.privateChats[action.privateChatId];
            return nextState;
        default:
            return state;
    }
}

export default unreadReducer;
