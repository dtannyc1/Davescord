import { useDispatch, useSelector } from "react-redux";
import './ChannelsPage.css';
import { createContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import icon from '../../assets/Davescord-icon.svg'
import ServerList from "../ServerList";
import CurrentUserProfile from "../CurrentUserProfile";
import CreateServerModal from "./CreateServerModal";
import ServerNameHeader from "./ServerNameHeader";
import Searchbar from "./Searchbar";
import ChannelsList from "./ChannelsList";
import ServerDetailsMenu from "../ServerDetailsMenu";
import ChannelNameHeader from "./ChannelNameHeader";
import CreateChannelModal from "./CreateChannelModal";
import ChannelDetailsMenu from "./ChannelDetailMenu";
import MessageList from "./MessageList";
import FriendsList from "./FriendsList";
import SubscriberList from "./SubscriberList";
import FriendsNameHeader from "./FriendsNameHeader";
import { useRef } from "react";
import { fetchServers} from "../../store/server";
import { fetchUser } from "../../store/user";
import UserDetailsMenu from "../UserDetailsMenu";
import { fetchFriends } from "../../store/friend";
import PrivateChatsList from "./PrivateChatsList";
import PrivateMessagesList from "./PrivateMessagesList";
import WelcomeInstructions from "./WelcomeInstructions";

export const MobileContext = createContext(null);

const ChannelsPage = ({setWebsocketRestart}) => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);

    const [showServerModal, setShowServerModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showServerDetail, setShowServerDetail] = useState(false);
    const [showChannelDetail, setShowChannelDetail] = useState(false);
    const [showUserDetail, setShowUserDetail] = useState(false);
    const [mobileExpand, setMobileExpand] = useState(false);  

    const categoryName = useRef();

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
        dispatch(fetchFriends())
    }, [dispatch, currentUserId])

    useEffect(() => {
        // Collapse mobile view when navigating to a different server
        setMobileExpand(false);
    }, [serverId]);

    return (
        <MobileContext.Provider value={{ mobileExpand, setMobileExpand }}>
            <div className={mobileExpand ? "channels-page mobile3" : "channels-page"}>
                <CreateServerModal visible={showServerModal} setVisible={setShowServerModal} setWebsocketRestart={setWebsocketRestart}/>
                <CreateChannelModal visible={showChannelModal} setVisible={setShowChannelModal} categoryName={categoryName} setWebsocketRestart={setWebsocketRestart}/>
                <ServerDetailsMenu visible={showServerDetail} setVisible={setShowServerDetail} />
                <ChannelDetailsMenu visible={showChannelDetail} setVisible={setShowChannelDetail} />
                <UserDetailsMenu visible={showUserDetail} setVisible={setShowUserDetail} />
                <div className="channels-column1-holder">
                    <div className="channels-column1">

                        <Link to='/channels/@me/welcome' className={(serverId === "@me") ? "icon selected" : "icon"}>
                            <img src={icon} alt="davescord-icon"/>
                            <div className="channels-left-selector"></div>
                        </Link>
                        <span className="tooltip">Direct Messages</span>
                        <hr className="channels-divider"/>

                        <ServerList setWebsocketRestart={setWebsocketRestart}/>

                        <div className="channels-add-server-button" onClick={() => setShowServerModal(true)}>
                            <div>+</div>
                            <span className="tooltip">Add a Server</span>
                        </div>

                    </div>
                </div>
                <div className="channels-column2-holder">
                    <div className="channels-column2">
                        {(serverId !== "@me") ? <ServerNameHeader setDetailVisibility={setShowServerDetail} showCreateChannel={setShowChannelModal} categoryName={categoryName}/> : <Searchbar/>}

                        {(serverId === "@me") ? <PrivateChatsList/>: <ChannelsList showCreateChannel={setShowChannelModal} categoryName={categoryName} setShowChannelDetail={setShowChannelDetail}/>}

                        <CurrentUserProfile setDetailVisibility={setShowUserDetail}/>
                    </div>
                </div>
                <div className="channels-column3-holder">
                    <div className="channels-column3">
                        {(serverId === "@me") ? <FriendsNameHeader/> : <ChannelNameHeader/>}
                        <div className="channels-column3-main-content">
                            {(serverId === "@me") ? <div className="friends-list-column3">
                                {(channelId === "welcome") ?
                                    <WelcomeInstructions/> :
                                (channelId === undefined) ?
                                    <FriendsList/> :
                                    <PrivateMessagesList/>
                                }

                            </div> : <MessageList/>}
                            {(serverId === "@me") ? null : <SubscriberList/>}
                        </div>
                    </div>
                </div>
            </div>
        </MobileContext.Provider>
    )
}

export default ChannelsPage;
