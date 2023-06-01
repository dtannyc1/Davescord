import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './ServerNameHeader.css';

const ServerNameHeader = () => {
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    return (
        <div className="server-name-holder">
            <div className="server-name">{currentServer.serverName}</div>
            <div className="server-fake-dropdown">v</div>
        </div>
    )
}

export default ServerNameHeader;
