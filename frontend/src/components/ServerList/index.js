import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import './ServerList.css'
import ServerItem from "./ServerItem";

const ServerList = () => {
    const servers = useSelector(state => Object.values(state.servers));
    if (!servers) return null;

    return (
        <>
            {servers.map(server => {
                return <ServerItem server={server}  key={server.id}/>
            })}
        </>
    )
}

export default ServerList;
