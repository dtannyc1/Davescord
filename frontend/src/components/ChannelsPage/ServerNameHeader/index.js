import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './ServerNameHeader.css';

const ServerNameHeader = () => {
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    return (
        <div className="channels-server-name">{currentServer.serverName}</div>
    )
}

export default ServerNameHeader;
