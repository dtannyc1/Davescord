import csrfFetch from "./csrf";

// action types
const ADD_MESSAGE = 'messages/ADD_MESSAGE';
const ADD_MESSAGES = 'messages/ADD_MESSAGES';
const REMOVE_MESSAGE = 'message/REMOVE_MESSAGE';

// action creators
export const addMessage = message => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export const addMessages = messages => {
    return {
        type: ADD_MESSAGES,
        messages
    }
}

export const removeMessage = messageId => {
    return {
        type: REMOVE_MESSAGE,
        messageId
    }
}

// thunk action creators

// reducer
const messagesReducer = (state = {}, action) => {
    let nextState = {...state};
    switch (action.type) {
        case ADD_MESSAGE:
            nextState[action.message.id] = action.message;
            return nextState
        case ADD_MESSAGES:
            return {...action.messages}
        case REMOVE_MESSAGE:
            delete nextState[action.messageId]
            return nextState
        default:
            return state
    }
}

export default messagesReducer;
