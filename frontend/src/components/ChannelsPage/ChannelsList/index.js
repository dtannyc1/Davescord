import './ChannelsList.css'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const ChannelsList = () => {
    const history = useHistory();
    const {serverId, channelId} = useParams();
    const channels = useSelector(state => Object.values(state.channels));
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

    if (channels.length === 0) return null;

    return (
        <div className='channels-list-holder'>
            {Object.values(categories).map(categoryArray => {
                return (
                    <>
                        <div className="channels-category-name-holder">
                            <div className='channels-category-name'>{`${categoryArray[0].categoryName}`}</div>
                            <div className="channels-plus-sign">+</div>
                        </div>
                        {categoryArray.map(channel => {
                            return (
                                <span className={(channelId == channel.id) ? 'channels-channel-item selected' : 'channels-channel-item'} onClick={e => history.push(`/channels/${serverId}/${channel.id}`)}>
                                    <span className='channels-hashtag'>#</span>
                                    <span className='channels-channel-name'>{`${channel.channelName.replace(/\s+/g, '-').toLowerCase()}`}</span>
                                </span>
                            )
                        })}
                    </>
                )
            })}
        </div>
    )
}

export default ChannelsList;
