import './ServerList.css'
import ServerItem from "./ServerItem";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchServer } from "../../store/server";
import { addSubscription } from "../../store/subscription";
import { useState } from 'react';


const ServerList = () => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const servers = useSelector(state => state.servers);
    const [tmpServers, setTmpServers] = useState(null);

    useEffect(() => {
        if (serverId !== "@me") {
            try {
                // should only fetch server if new subscription is made,
                // otherwise we already have everything about the server that we need?
                // that would mean fetching all the messages at the start for every single server...
                // what if fetchServer doesnt actually update server slice of state?

                dispatch(addSubscription(parseInt(serverId)))
                    .then(() => {
                        dispatch(fetchServer(parseInt(serverId)))
                        .then(() => {
                            if ((channelId === undefined && servers[parseInt(serverId)]?.channels?.length > 0)) {
                                    let firstChannelId = servers[parseInt(serverId)].channels[0];
                                    history.push(`/channels/${parseInt(serverId)}/${firstChannelId}`)
                            }
                        })
                    })
                    .catch(() => {
                        history.push('/channels/@me/')
                        return null;
                    })
            } catch (errors) {
                history.push('/channels/@me/')
                return null;
            }
        }
    }, [dispatch, serverId, history])

    useEffect(()=> {
        // here just to force a rerender when servers load
        setTmpServers(servers);
    }, [servers])

    return (
        <>
            {Object.values(servers).map(server => {
                return <ServerItem server={server}  key={server.id}/>
            })}
        </>
    )
}

export default ServerList;
