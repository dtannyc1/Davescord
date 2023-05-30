import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers } from "../../store/server";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './ServerList.css'

const ServerList = ({activeServer}) => {
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
                if (server.serverImage) {
                    return <Link to={`/channels/${server.id}`} className={(activeServer == server.id) ? "selected" : null}>
                            <img src={server.serverImage} alt={server.serverName}/>
                        </Link>
                } else{
                    return <Link to={`/channels/${server.id}`} className={(activeServer == server.id) ? "selected" : null}>
                            <div className="server-image">
                                {server.serverName.toUpperCase().charAt(0)}
                            </div>
                        </Link>
                }
            })}
        </ul>
    )
}

export default ServerList;
