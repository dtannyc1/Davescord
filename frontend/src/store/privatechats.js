import csrfFetch from "./csrf";

// action types
const ADD_PRIVATE_CHAT = 'privatechats/ADD_PRIVATE_CHAT';
const ADD_PRIVATE_CHATS = 'privatechats/ADD_PRIVATE_CHATS';
const REMOVE_PRIVATE_CHAT = 'privatechats/REMOVE_PRIVATE_CHATS';

// action creators
const addPrivateChat = privateChat => {
    return {
        type: ADD_PRIVATE_CHAT,
        privateChat
    }
}

const addPrivateChats = privateChats => {
    return {
        type: ADD_PRIVATE_CHATS,
        privateChats
    }
}

const removePrivateChat = (privateChatId) => {
    return {
        type: REMOVE_PRIVATE_CHAT,
        privateChatId
    }
}

// thunk action creators

// reducer
const privateChatsReducer = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type){
        case ADD_PRIVATE_CHAT:
            nextState[action.privateChat.id] = action.privateChat
            return nextState
        case ADD_PRIVATE_CHATS:
            return {...action.privateChats}
        case REMOVE_PRIVATE_CHAT:
            delete nextState[action.privateChatId]
            return nextState
        default:
            return state
    }
}


export default privateChatsReducer;
