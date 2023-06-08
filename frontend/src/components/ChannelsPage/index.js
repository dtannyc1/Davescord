import { useDispatch, useSelector } from "react-redux";
import './ChannelsPage.css';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchServer, fetchServers } from "../../store/server";
import icon from '../../assets/Davescord-icon.svg'
import ServerList from "../ServerList";
import CurrentUserProfile from "../CurrentUserProfile";
import { fetchUser } from "../../store/user";
import CreateServerModal from "./CreateServerModal";
import ServerNameHeader from "./ServerNameHeader";
import Searchbar from "./Searchbar";
import ChannelsList from "./ChannelsList";
import ServerDetailsMenu from "../ServerDetailsMenu";
import ChannelNameHeader from "./ChannelNameHeader";
import CreateChannelModal from "./CreateChannelModal";
import ChannelDetailsMenu from "./ChannelDetailMenu";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MessageList from "./MessageList";
import SubscriberList from "./SubscriberList";
import { addSubscription } from "../../store/subscription";

const ChannelsPage = ({setWebsocketRestart}) => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentServer = useSelector(state => state.servers[serverId]);
    const [showServerModal, setShowServerModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showServerDetail, setShowServerDetail] = useState(false);
    const [showChannelDetail, setShowChannelDetail] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
    }, [dispatch, currentUserId])

    useEffect(() => {
        if (serverId !== "@me") {
            try {
                dispatch(addSubscription(serverId))
                dispatch(fetchServer(serverId))
                    .catch(error => {
                        history.push('/channels/@me')
                        return null;
                    })
            } catch (errors) {
                history.push('/channels/@me')
                return null;
            }
        }
    }, [dispatch, serverId, history])

    if (serverId !== "@me" && channelId === undefined && currentServer && currentServer.channels && currentServer.channels.length > 0) {
        return (
            <Redirect to={`/channels/${serverId}/${currentServer?.channels[0]}`}/>
        )
    }

    return (
        <div className="channels-page">
            <CreateServerModal visible={showServerModal} setVisible={setShowServerModal} setWebsocketRestart={setWebsocketRestart}/>
            <CreateChannelModal visible={showChannelModal} setVisible={setShowChannelModal} categoryName={categoryName} setWebsocketRestart={setWebsocketRestart}/>
            <ServerDetailsMenu visible={showServerDetail} setVisible={setShowServerDetail} />
            <ChannelDetailsMenu visible={showChannelDetail} setVisible={setShowChannelDetail} />
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
                    {(currentServer) ? <ServerNameHeader setDetailVisibility={setShowServerDetail}/> : <Searchbar/>}

                    {(serverId === "@me") ? <div>Friends list here</div>: <ChannelsList showCreateChannel={setShowChannelModal} setCategoryName={setCategoryName} setShowChannelDetail={setShowChannelDetail}/>}

                    <CurrentUserProfile/>
                </div>
            </div>
            <div className="channels-column3-holder">
                <div className="channels-column3">
                    {(serverId === "@me") ? <div>Friends list</div> : <ChannelNameHeader/>}
                    <div className="channels-column3-main-content">
                        {(serverId === "@me") ? <div>DMs</div> : <MessageList/>}
                        {(serverId === "@me") ? null : <SubscriberList/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChannelsPage;
