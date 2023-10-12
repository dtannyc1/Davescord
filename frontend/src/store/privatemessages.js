import csrfFetch from "./csrf";
import { addMessages } from "./message";

// action types
export const ADD_PRIVATE_MESSAGE = 'private_messages/ADD_PRIVATE_MESSAGE';
export const ADD_PRIVATE_MESSAGES = 'private_messages/ADD_PRIVATE_MESSAGES';
export const REMOVE_PRIVATE_MESSAGE = 'private_messages/REMOVE_MESSAGE';

// action creators
export const addPrivateMessage = (message, privateChatId) => {
    return {
        type: ADD_PRIVATE_MESSAGE,
        message,
        privateChatId
    }
}

export const addPrivateMessages = (messages, privateChatId) => {
    return {
        type: ADD_PRIVATE_MESSAGES,
        messages,
        privateChatId
    }
}

export const removePrivateMessage = (privateMessageId, privateChatId) => {
    return {
        type: REMOVE_PRIVATE_MESSAGE,
        privateMessageId,
        privateChatId
    }
}

// thunk action creators
export const fetchPrivateMessages = (privateChatId) => async dispatch => {
    let res = await csrfFetch(`/api/private_chats/${privateChatId}/private_messages`)

    if (res.ok) {
        let data = await res.json();
        dispatch(addPrivateMessages(data.privateMessages, privateChatId));
    }
}

// reducer
const privateMessagesReducer = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type){
        case ADD_PRIVATE_MESSAGE:
            nextState[action.message.id] = action.message
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
