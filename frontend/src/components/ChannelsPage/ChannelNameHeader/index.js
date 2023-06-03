import './ChannelNameHeader.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const ChannelNameHeader = () => {
    const {serverId, channelId} = useParams();
    const channel = useSelector(state => state.channels[channelId]);
    const server = useSelector(state => state.servers[serverId]);

    if (!channel) return (
        <div className='channel-name-holder'>
            <div className='channel-server-name'>
                {`${server?.serverName.replace(/\s+/g, '-').toLowerCase()}`}
            </div>
        </div>
    )

    return (
        <div className='channel-name-holder'>
            <div className='channel-server-name'>
                {`${channel?.channelName.replace(/\s+/g, '-').toLowerCase()}`}
                <div className='channel-server-description'>{`${channel?.description}`}</div>
            </div>

        </div>
    )
}

export default ChannelNameHeader;
