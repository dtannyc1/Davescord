import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './ChannelOverviewMenu.css'
import { useEffect, useRef, useState } from 'react';
import { updateChannel } from '../../../../store/channel';

const ChannelOverviewMenu = ({visibility, visibilitySetter}) => {
    const dispatch = useDispatch();
    const {channelId} = useParams();
    const currentChannel = useSelector(state => state.channels[channelId]);
    let originalChannelName = useRef(currentChannel ? currentChannel.channelName : '');
    let originalChannelCategory = useRef(currentChannel ? currentChannel.categoryName : '');
    let originalChannelTopicName = useRef(currentChannel ? currentChannel.description : '');
    const [channelName, setChannelName] = useState(originalChannelName.current);
    const [category, setCategory] = useState(originalChannelCategory.current);
    const [description, setDescription] = useState(originalChannelTopicName.current);

    const resetFields = () => {
        setChannelName(originalChannelName.current);
        setCategory(originalChannelCategory.current);
        setDescription(originalChannelTopicName.current);
    }

    useEffect(() => {
        originalChannelName.current =  currentChannel ? currentChannel.channelName : '';
        originalChannelCategory.current = currentChannel ? currentChannel.categoryName : '';
        originalChannelTopicName.current = currentChannel ? currentChannel.description : '';
        setChannelName(originalChannelName.current);
        setCategory(originalChannelCategory.current);
        setDescription(originalChannelTopicName.current);
    }, [currentChannel])

    useEffect(() => {
        if (!visibility){
            setChannelName(originalChannelName.current);
            setCategory(originalChannelCategory.current);
            setDescription(originalChannelTopicName.current);
        }
    }, [visibility])

    const changeChannel = e => {
        e.preventDefault();
        currentChannel.channelName = channelName;
        currentChannel.categoryName = category;
        currentChannel.description = description;
        dispatch(updateChannel(currentChannel));
        visibilitySetter(false);
    }

    return (
        <div className="channel-overview-menu">
            <h3>Overview</h3>
            <div>
                <div>
                    <span className='channel-overview-input-title'>
                        channel name
                    </span>
                    <form>
                        <input className='channel-overview-input'
                                type='text'
                                value={channelName.replace(/\s+/g, '-').toLowerCase()}
                                onChange={e => setChannelName(e.target.value)}/>
                    </form>

                    <span className='channel-overview-input-title'>
                        category
                    </span>
                    <form>
                        <input className='channel-overview-input'
                                type='text'
                                value={category}
                                onChange={e => setCategory(e.target.value)}/>
                    </form>

                    <span className='channel-overview-input-title'>
                        channel topic
                    </span>
                    <form>
                        <input className='channel-overview-input'
                                type='text'
                                value={description}
                                onChange={e => setDescription(e.target.value)}/>
                    </form>
                </div>
                <div className={((originalChannelName.current.replace(/\s+/g, '-').toLowerCase() !== channelName.replace(/\s+/g, '-').toLowerCase() ||
                                 originalChannelCategory.current !== category ||
                                 originalChannelTopicName.current !== description)
                                 && channelName.length > 0 && category.length > 0)
                        ? 'save-button-holder' : 'save-button-holder hidden'}>
                    <div className="save-button-text">
                        Careful - you have unsaved changes!</div>
                    <div className="buttons">
                        <button className='channel-overview-reset-button' onClick={e => resetFields()}>Reset</button>
                        <button className='channel-overview-save-button' onClick={changeChannel}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default ChannelOverviewMenu;
