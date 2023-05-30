import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers } from "../../store/server";

const ServerList = () => {
    const dispatch = useDispatch();
    // const currentUserId = useSelector(state => state.session.currentUserId);
    const servers = useSelector(state => Object.values(state.servers));

    useEffect(() => {
        dispatch(fetchServers())
    }, [dispatch])

    if (!servers) return null;

    return (
        <ul className="server-list">
            {servers.map(server => {
                return <li key={server.id}>{server.serverName}</li>
            })}
        </ul>
    )
}

export default ServerList;
