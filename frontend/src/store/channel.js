
// action types
const ADD_CHANNEL = 'channels/ADD_CHANNEL';
const ADD_CHANNELS = 'channels/ADD_CHANNELS';
const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL';

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

// reducer
const channelsReducer = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case ADD_CHANNEL:
            return {...nextState, ...action.channel}
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
