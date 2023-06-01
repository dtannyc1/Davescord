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
import { useState } from "react";
import CreateServerModal from "./CreateServerModal";
import ServerNameHeader from "./ServerNameHeader";

const ChannelsPage = () => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentServer = useSelector(state => state.servers[serverId]);
    const [showServerModal, setShowServerModal] = useState(false);

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
    }, [dispatch, currentUserId])

    // notes:
    // use serverId and channelId to determine what to render

    // column 1:
        // hovered icon also has small rect
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
            <CreateServerModal visible={showServerModal} setVisible={setShowServerModal}/>
            <div className="channels-column1-holder">
                <div className="channels-column1">

                    <Link to='/channels/@me' className={(serverId === "@me") ? "icon selected" : "icon"}>
                        <img src={icon} alt="davescord-icon"/>
                        <div className="channels-left-selector"></div>
                    </Link>
                    <span className="tooltip">Direct Messages</span>
                    <hr className="channels-divider"/>

                    <ServerList activeServer={serverId}/>

                    <div className="channels-add-server-button" onClick={e => setShowServerModal(true)}>
                        <div>+</div>
                        <span className="tooltip">Add a Server</span>
                    </div>

                </div>
            </div>
            <div className="channels-column2-holder">
                <div className="channels-column2">
                    {(currentServer) ?
                        <ServerNameHeader/> :
                        <div className="channels-searchbar">searchbar goes here</div>}



                    <CurrentUserProfile/>
                </div>
            </div>
            <div className="channels-column3-holder">
                <div className="channels-column3">

                </div>
            </div>
        </div>
    )
}

export default ChannelsPage;
