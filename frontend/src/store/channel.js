
// action types
const ADD_CHANNELS = 'channels/ADD_CHANNELS';

// action creators
export const addChannels = channels => {
    return {
        type: ADD_CHANNELS,
        channels
    }
}

// thunk action creators

// reducer
const channelsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CHANNELS:
            return {...action.channels}
        default:
            return state
    }
}

export default channelsReducer;
