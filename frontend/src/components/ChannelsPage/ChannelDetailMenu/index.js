import './ChannelDetailMenu.css'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChannelOverviewMenu from './ChannelOverviewMenu';
import { deleteChannel } from '../../../store/channel';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import exitButton from '../../../assets/menu-exit-button.svg';

const ChannelDetailsMenu = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId, channelId} = useParams();
    const [showOverview, setShowOverview] = useState(true);
    const currentChannel = useSelector(state => state.channels[channelId]);

    const setMenu = menuName => {
        setShowOverview(false)
        switch (menuName) {
            case "overview":
                setShowOverview(true)
                break;
            default:
                break;
        }
    }

    const handleDeletion = e => {
        e.preventDefault();
        dispatch(deleteChannel(channelId))
        setVisible(false);
        history.push(`/channels/${serverId}`)
    }

    return (
        <div className={visible ? "channel-details-menu" : "channel-details-menu hidden"}>
            <div className="channel-details-left">
                <div className="channel-details-sidebar">
                    <ul>
                        <li className="channel-details-title">
                            {`# ${currentChannel?.channelName} ${currentChannel?.categoryName}`}
                        </li>
                        <li className={showOverview ? "selected" : null} onClick={e => setMenu("overview")}>Overview</li>
                    </ul>
                    <hr className="channel-details-divider"/>
                    <ul>
                        <li onClick={handleDeletion}>Delete Channel</li>
                    </ul>
                </div>
            </div>
            <div className="channel-details-right">
                {showOverview ? <ChannelOverviewMenu visibility={visible} visibilitySetter={setVisible}/> : null}
                <img src={exitButton} alt="exit icon" className="channel-details-exit" onClick={e => setVisible(false)}/>
            </div>
        </div>
    )
}

export default ChannelDetailsMenu;
