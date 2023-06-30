import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import './ServerList.css'
import { useRef } from "react";
import { useEffect } from "react";

const ServerItem = ({server}) => {
    const {serverId} = useParams();
    const unread = useSelector(state => state.unread.servers[server.id]);
    const currentServer = useSelector(state => state.servers[serverId]);
    const output = useRef();

    useEffect(() => {
        let unreadStatus = (unread) ? " unread" : "";

        if (server.photoUrl) {
            output.current = (
                <div className={`server-item${unreadStatus}`}>
                    <Link to={`/channels/${server.id}`} className={(parseInt(serverId) === server.id) ? "selected" : null}>
                        <img src={server.photoUrl} alt={server.serverName}/>
                        <div className="channels-left-selector"></div>
                    </Link>
                    <span className="tooltip">{server.serverName}</span>
                </div>
            )
        } else{
            output.current = (
                <div className={`server-item${unreadStatus}`}>
                    <Link to={`/channels/${server.id}`} className={(parseInt(serverId) === server.id) ? "selected" : null}>
                        <div className="server-image">
                            {server.serverName.toUpperCase().charAt(0)}
                        </div>
                        <div className="channels-left-selector"></div>
                    </Link>
                    <span className="tooltip">{server.serverName}</span>
                </div>
            )
        }
    }, [unread, currentServer])

    return output.current
}

export default ServerItem;
