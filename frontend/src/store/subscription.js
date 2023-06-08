import { parseServerData, removeServer } from "./server"
import csrfFetch from "./csrf";

// action types

// action creators

// thunk action creators
export const addSubscription = (serverId) => async dispatch  => {
    try {
    let res = await csrfFetch('/api/subscriptions', {
        method: "POST",
        body: JSON.stringify({subscription: {serverId: serverId}})
    })

    if (res.ok) {
        let data = await res.json();
        parseServerData(data, dispatch);
        return data
    }}
    catch(err) {
        return false;
    }
}

export const removeSubscription = (serverId) => async dispatch => {
    let res = await csrfFetch(`/api/subscriptions/${serverId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeServer(serverId))
    }
}

// reducer
