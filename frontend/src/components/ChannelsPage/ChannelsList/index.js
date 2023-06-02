import './ChannelsList.css'
import { useSelector } from "react-redux";


const ChannelsList = () => {
    const channels = useSelector(state => Object.values(state.channels));

    if (channels.length === 0) return null;

    return (
        <div className='channels-list-holder'>
            {channels.map(channel => {
                return (
                    <span>{`# ${channel.channelName}`}</span>
                )
            })}
        </div>
    )
}

export default ChannelsList;
