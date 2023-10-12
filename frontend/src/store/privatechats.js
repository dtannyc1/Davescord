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

export const removePrivateChat = (privateChatId) => {
    return {
        type: REMOVE_PRIVATE_CHAT,
        privateChatId
    }
}

// thunk action creators
export const fetchPrivateChats = () => async dispatch => {
    let res = await csrfFetch('/api/private_chats')

    if (res.ok){
        let data = await res.json();
        dispatch(addPrivateChats(data.privateChats))
    }
}

export const fetchPrivateChat = (privateChatId) => async dispatch => {
    let res = await csrfFetch(`/api/private_chats/${privateChatId}`)

    if (res.ok) {
        let data = await res.json();
        dispatch(addPrivateChat(data.privateChat))
    } else {
        throw res
    }
}

export const createPrivateChat = (privateChat) => async dispatch => {
    let res = await csrfFetch(`/api/private_chats`,{
        method: "POST",
        body: JSON.stringify({privateChat: privateChat})
    });

    if (res.ok){
        let data = await res.json();
        return data;
    }
}

export const deletePrivateChat = (privateChatId) => async dispatch => {
    await csrfFetch(`/api/private_chats/${privateChatId}`, {
        method: "DELETE"
    })
}




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
