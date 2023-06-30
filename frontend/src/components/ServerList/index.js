import { useDispatch, useSelector } from "react-redux";
import './ServerList.css'
import ServerItem from "./ServerItem";
import { fetchServers } from "../../store/server";
import { fetchUser } from "../../store/user";
import { useEffect} from "react";


const ServerList = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const servers = useSelector(state => Object.values(state.servers));
    // useEffect(() => {

    // }, [servers])

    // if (!servers) return null;

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
    }, [dispatch, currentUserId])

    return (
        <>
            {servers.map(server => {
                return <ServerItem server={server}  key={server.id}/>
            })}
        </>
    )
}

export default ServerList;
