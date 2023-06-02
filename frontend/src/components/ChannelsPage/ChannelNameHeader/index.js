import './ChannelNameHeader.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const ChannelNameHeader = () => {
    const {channelId} = useParams();
    const channel = useSelector(state => state.channels[channelId]);

    // if (!channel) return null;

    return (
        <div className='channel-name-holder'>
            <div className='channel-server-name'>{`${channel?.channelName.replace(/\s+/g, '-').toLowerCase()}`}</div>
        </div>
    )
}

export default ChannelNameHeader;
