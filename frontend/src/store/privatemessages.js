import csrfFetch from "./csrf";

// action types
export const ADD_PRIVATE_MESSAGE = 'private_messages/ADD_PRIVATE_MESSAGE';
const ADD_PRIVATE_MESSAGES = 'private_messages/ADD_PRIVATE_MESSAGES';
export const REMOVE_PRIVATE_MESSAGE = 'private_messages/REMOVE_MESSAGE';

// action creators
export const addPrivateMessage = (message, privateChatId) => {
    return {
        type: ADD_PRIVATE_MESSAGE,
        message,
        privateChatId
    }
}

export const addPrivateMessages = messages => {
    return {
        type: ADD_PRIVATE_MESSAGES,
        messages
    }
}

export const removeMessage = (privateMessageId, privateChatId) => {
    return {
        type: REMOVE_PRIVATE_MESSAGE,
        privateMessageId,
        privateChatId
    }
}

// thunk action creators

// reducer
const privateMessagesReducer = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type){
        case ADD_PRIVATE_MESSAGE:
            nextState[action.message.id] = message
            return nextState
        case ADD_PRIVATE_MESSAGES:
            return {...nextState, ...action.messages}
        case REMOVE_PRIVATE_MESSAGE:
            delete nextState[action.privateMessageId]
            return nextState
        default:
            return state
    }
}


export default privateMessagesReducer;
