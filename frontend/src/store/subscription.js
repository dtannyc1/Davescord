import { fetchServer, fetchServerFull, parseServerData, removeServer } from "./server"
import csrfFetch from "./csrf";

// action types

// action creators

// thunk action creators
export const addSubscription = (serverId) => async dispatch  => {
    try {
        let res = await csrfFetch('/api/subscriptions', {
            method: "POST",
            body: JSON.stringify({subscription: {serverId: serverId}})
        }).catch(err => {throw err})

        if (res.ok) {
            let data = await res.json();
            if (data.createdSubscription) {
                dispatch(fetchServerFull(data.serverId))
                // once server is added from a new subscription,
                // websockets should restart?
                return true;
            }
            // parseServerData(data, dispatch);
            // return data
            return false;
        } else {
            throw res;
        }
    }
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
