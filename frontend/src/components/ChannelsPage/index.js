import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './ChannelsPage.css';
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchServers } from "../../store/server";
import icon from '../../assets/Davescord-icon.svg'
import ServerList from "../ServerList";
import CurrentUserProfile from "../CurrentUserProfile";
import { fetchUser } from "../../store/user";

const ChannelsPage = () => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentServer = useSelector(state => state.servers[serverId]);

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
    }, [dispatch, currentUserId])

    // console.log(serverId)
    // console.log(currentServer.serverName)
    // notes:
    // use serverId and channelId to determine what to render

    // column 1:
        // always show list of servers
        // each server links to /channels/:serverId/
        // selected icon has:
            // small rect next to it 8x40, small border radius
            // different border radius
        // hovered icon also has small rect
            // animated small rect, opacity & scale
            // animated different border radius,
            // animated show server name, opacity

    // column 2:
        // if serverId === "@me"
            // render friends list
        // else
            // render channels

    // column 3:
        // if serverId === "@me"
            // if channelId
                // render private messages
            // else
                // render friends list
        // else
            // if channelId
                // render messages
            // else
                // find list of channels for server, then redirect to first channel

    // if (!currentServer) return null;
    return (
        <div className="channels-page">
            <div className="channels-column1">
                <Link to='/channels/@me' className={(serverId === "@me") ? "icon selected" : "icon"}>
                    <img src={icon} alt="davescord-icon"/>
                </Link>
                <hr className="channels-divider"/>
                <ServerList activeServer={serverId}/>
                <div className="channels-add-server-button">
                    <div>+</div>
                </div>
            </div>
            <div className="channels-column2">
                {(currentServer) ?
                    <div className="channels-server-name">{currentServer.serverName}</div> :
                    <div className="channels-searchbar">searchbar goes here</div>}
                <CurrentUserProfile/>
            </div>
            <div className="channels-column3">

            </div>
        </div>
    )
}

export default ChannelsPage;
