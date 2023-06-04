import './ChannelsList.css'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const ChannelsList = () => {
    const history = useHistory();
    const {serverId, channelId} = useParams();
    const channels = useSelector(state => Object.values(state.channels));
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentServer = useSelector(state => state.servers[serverId]);
    let categories = {};
    channels.forEach(channel => {
        if (categories[channel.categoryName]){
            categories[channel.categoryName].push(channel);
        } else {
            categories[channel.categoryName] = [channel];
        }
    });
    // useEffect(() => {
    //     categories = {};

    // }, [channels])

    const handleAddChannel = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleEditChannel = channel => e => {
        e.preventDefault();
        e.stopPropagation();
    }

    if (channels.length === 0) return null;

    return (
        <div className='channels-list-holder'>
            {Object.values(categories).map((categoryArray, ii) => {
                return (
                    <div key={ii}>
                        <div className="channels-category-name-holder">
                            <div className='channels-category-name'>
                                {`${categoryArray[0].categoryName}`}
                            </div>
                            {(currentServer.ownerId === currentUserId) ?
                                <div className="channels-plus-sign" onClick={handleAddChannel}>+</div> : null}
                        </div>
                        {categoryArray.map(channel => {
                            return (
                                <span key={channel.id} className={(parseInt(channelId) === channel.id) ? 'channels-channel-item selected' : 'channels-channel-item'} onClick={e => history.push(`/channels/${serverId}/${channel.id}`)}>
                                    <span className='channels-hashtag'>#</span>
                                    <span className='channels-channel-name'>{`${channel.channelName.replace(/\s+/g, '-').toLowerCase()}`}</span>
                                    {(currentServer.ownerId === currentUserId && parseInt(channelId) === channel.id) ?
                                        <span className="channels-edit-sign" onClick={handleEditChannel(channel)}>+</span> : null}
                                </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default ChannelsList;
