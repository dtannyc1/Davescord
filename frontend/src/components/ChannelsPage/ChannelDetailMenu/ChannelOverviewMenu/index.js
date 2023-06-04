import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './ChannelOverviewMenu.css'
import { useEffect, useState } from 'react';
import { updateChannel } from '../../../../store/channel';

const ChannelMenu = ({visibility, visibilitySetter}) => {
    const dispatch = useDispatch();
    const {channelId} = useParams();
    const currentChannel = useSelector(state => state.channels[channelId]);
    let originalChannelName = currentChannel ? currentChannel.channelName : '';
    let originalChannelCategory = currentChannel ? currentChannel.categoryName : '';
    let originalChannelTopicName = currentChannel ? currentChannel.description : '';
    const [channelName, setChannelName] = useState(originalChannelName);
    const [category, setCategory] = useState(originalChannelCategory);
    const [description, setDescription] = useState(originalChannelTopicName);

    useEffect(() => {
        originalChannelName =  currentChannel ? currentChannel.channelName : '';
        originalChannelCategory = currentChannel ? currentChannel.categoryName : '';
        originalChannelTopicName = currentChannel ? currentChannel.description : '';
        resetFields();
    }, [currentChannel])

    useEffect(() => {
        if (!visibility){
            resetFields();
        }
    }, [visibility])

    const resetFields = () => {
        setChannelName(originalChannelName);
        setCategory(originalChannelCategory);
        setDescription(originalChannelTopicName);
    }

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
                    <span className='channel-overview-input-title'>channel name</span>
                    <form>
                        <input className='channel-overview-input' type='text' value={channelName} onChange={e => setChannelName(e.target.value)}/>
                    </form>

                    <span className='channel-overview-input-title'>category</span>
                    <form>
                        <input className='channel-overview-input' type='text' value={category} onChange={e => setCategory(e.target.value)}/>
                    </form>

                    <span className='channel-overview-input-title'>channel topic</span>
                    <form>
                        <input className='channel-overview-input' type='text' value={description} onChange={e => setDescription(e.target.value)}/>
                    </form>
                </div>
                <div className={(originalChannelName !== channelName ||
                                 originalChannelCategory !== category ||
                                 originalChannelTopicName !== description )
                        ? 'save-button-holder' : 'save-button-holder hidden'}>
                    <div>Careful - you have unsaved changes!</div>
                    <div>
                        <button className='channel-overview-reset-button' onClick={e => resetFields()}>Reset</button>
                        <button className='channel-overview-save-button' onClick={changeChannel}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default ChannelMenu;
