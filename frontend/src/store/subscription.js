import { addServer, removeServer } from "./server"
import csrfFetch from "./csrf";

// action types

// action creators

// thunk action creators
export const addSubscription = (serverId) => async dispatch  => {
    let res = await csrfFetch('/api/subscriptions', {
        method: "POST",
        body: JSON.stringify({subscription: {serverId: serverId}})
    })

    debugger

    if (res.ok) {
        let data = await res.json();
        dispatch(addServer(data))
        return data
    }
}

// reducer
