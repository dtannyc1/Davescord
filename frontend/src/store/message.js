import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from "./session";

// action types
export const ADD_MESSAGE = 'messages/ADD_MESSAGE';
const ADD_MESSAGES = 'messages/ADD_MESSAGES';
export const REMOVE_MESSAGE = 'message/REMOVE_MESSAGE';

// action creators
export const addMessage = (message, channelId) => {
    return {
        type: ADD_MESSAGE,
        message,
        channelId
    }
}

export const addMessages = messages => {
    return {
        type: ADD_MESSAGES,
        messages
    }
}

export const removeMessage = (messageId, channelId) => {
    return {
        type: REMOVE_MESSAGE,
        messageId,
        channelId
    }
}

// thunk action creators
export const fetchMessages = (channelId) => async dispatch => {
    let res = await csrfFetch(`/api/channels/${channelId}/messages`);

    if (res.ok) {
        let data = await res.json();
        dispatch(addMessages(data.messages));
    }
}

export const createMessage = (channelId, body) => async () => {
    csrfFetch(`/api/channels/${channelId}/messages`, {
        method: "POST",
        body: JSON.stringify({message: {body: body}})
    });

    // if (res.ok) {
    //     let data = await res.json();
    //     dispatch(addMessage(data, channelId))
    // }
}

export const updateMessage = (message) => async dispatch => {
    let res = await csrfFetch(`/api/messages/${message.id}`, {
        method: "PUT",
        body: JSON.stringify({message: message})
    });

    // if (res.ok) {
    //     let data = await res.json();
    //     dispatch(addMessage(data))
    // }
}

export const deleteMessage = (messageId, channelId) => async dispatch => {
    let res = await csrfFetch(`/api/messages/${messageId}`, {
        method: "DELETE"
    });

    if (res.ok){
        dispatch(removeMessage(messageId, channelId))
    }
}


// reducer
const messagesReducer = (state = {}, action) => {
    let nextState = {...state};
    switch (action.type) {
        case ADD_MESSAGE:
            nextState[action.message.id] = action.message;
            return nextState
        case ADD_MESSAGES:
            return {...nextState, ...action.messages}
        case REMOVE_MESSAGE:
            delete nextState[action.messageId]
            return nextState
        case REMOVE_CURRENT_USER:
            return ({});
        default:
            return state
    }
}

export default messagesReducer;
