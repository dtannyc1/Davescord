import csrfFetch from "./csrf";

// action types
export const ADD_CHANNEL = 'channels/ADD_CHANNEL';
const ADD_CHANNELS = 'channels/ADD_CHANNELS';
export const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL';

// action creators
export const addChannels = channels => {
    return {
        type: ADD_CHANNELS,
        channels
    }
}

export const addChannel = channel => {
    return {
        type: ADD_CHANNEL,
        channel
    }
}

export const removeChannel = channelId => {
    return {
        type: REMOVE_CHANNEL,
        channelId
    }
}

// thunk action creators
export const createChannel = (channel) => async dispatch => {
    let res = await csrfFetch(`/api/channels`, {
        method: "POST",
        body: JSON.stringify({channel: channel})
    });

    if (res.ok) {
        let data = await res.json();
        dispatch(addChannel(data))
    }
}

export const updateChannel = (channel) => async dispatch => {
    let res = await csrfFetch(`/api/channels/${channel.id}`, {
        method: "PATCH",
        body: JSON.stringify({channel: channel})
    })

    if (res.ok){
        let data = await res.json();
        dispatch(addChannel(data))
    }
}

export const deleteChannel = (channelId) => async dispatch => {
    let res = await csrfFetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeChannel(channelId))
    }
}

// reducer
const channelsReducer = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case ADD_CHANNEL:
            nextState[action.channel.id] = action.channel
            return nextState
        case ADD_CHANNELS:
            return {...action.channels}
        case REMOVE_CHANNEL:
            delete nextState[action.channelId]
            return nextState
        default:
            return state
    }
}

export default channelsReducer;
