import './ServerList.css'
import ServerItem from "./ServerItem";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { fetchServers, fetchServer } from "../../store/server";
import { fetchUser } from "../../store/user";
import { addSubscription } from "../../store/subscription";


const ServerList = () => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const servers = useSelector(state => state.servers);
    // useEffect(() => {

    // }, [servers])

    // if (!servers) return null;

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
    }, [dispatch, currentUserId])

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

    if ((serverId !== "@me" && channelId === undefined &&
        servers[parseInt(serverId)]?.channels?.length > 0)) {
            let firstChannelId = servers[parseInt(serverId)].channels[0];
            history.push(`/channels/${parseInt(serverId)}/${firstChannelId}`)
    }

    return (
        <>
            {Object.values(servers).map(server => {
                return <ServerItem server={server}  key={server.id}/>
            })}
        </>
    )
}

export default ServerList;
