import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/session";
import { useHistory, Link } from "react-router-dom";
import './ChannelsPage.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import icon from '../../assets/Davescord-icon.svg'
import ServerList from "../ServerList";

const ChannelsPage = () => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const history = useHistory();

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

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logoutUser(currentUserId))
        history.push('/')
    }

    return (
        <div className="channels-page">
            <div className="channels-column1">
                <Link to='/channels/@me'>
                    <img className={(serverId === "@me") ? "icon selected" : "icon"} src={icon} alt="davescord-icon"/>
                </Link>
                <hr className="channels-divider"/>
                <ServerList activeServer={serverId}/>
            </div>
            <div className="channels-column2">
                Hello from channels page
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="channels-column3">

            </div>
        </div>
    )
}

export default ChannelsPage;
