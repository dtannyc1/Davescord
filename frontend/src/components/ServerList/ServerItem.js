import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import './ServerList.css'
import { useRef } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ServerItem = ({server}) => {
    const {serverId} = useParams();
    const history = useHistory();
    const unread = useSelector(state => state.unread.servers[server.id]);
    const currentServer = useSelector(state => state.servers[serverId]);
    const output = useRef();

    const handleServerChange = (e) => {
        e.preventDefault();
        if (parseInt(serverId) !== server.id) {
            history.push(`/channels/${parseInt(server.id)}`)
        }
    }

    useEffect(() => {
        let unreadStatus = (unread) ? " unread" : "";

        if (server.photoUrl) {
            output.current = (
                <div className={`server-item${unreadStatus}`}>
                    <Link to={`/channels/${server.id}`} onClick={handleServerChange} className={(parseInt(serverId) === server.id) ? "selected" : null}>
                        <img src={server.photoUrl} alt={server.serverName.toUpperCase().charAt(0)}/>
                        <div className="channels-left-selector"></div>
                    </Link>
                    <span className="tooltip">{server.serverName}</span>
                </div>
            )
        } else{
            output.current = (
                <div className={`server-item${unreadStatus}`}>
                    <Link to={`/channels/${server.id}`} onClick={handleServerChange} className={(parseInt(serverId) === server.id) ? "selected" : null}>
                        <div className="server-image">
                            {server.serverName.toUpperCase().charAt(0)}
                        </div>
                        <div className="channels-left-selector"></div>
                    </Link>
                    <span className="tooltip">{server.serverName}</span>
                </div>
            )
        }
    }, [unread, currentServer, serverId])

    return output.current
}

export default ServerItem;
