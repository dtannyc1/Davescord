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
    const [channelName, setChannelName] = useState(originalChannelName);

    useEffect(() => {
        originalChannelName =  currentChannel ? currentChannel.channelName : '';
        setChannelName(originalChannelName)
    }, [currentChannel])

    useEffect(() => {
        if (!visibility){
            setChannelName(originalChannelName);
        }
    }, [visibility])

    const changeChannel = e => {
        e.preventDefault();
        currentChannel.channelName = channelName;
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
                </div>
                <div className={(originalChannelName === channelName) ? 'save-button-holder hidden' : 'save-button-holder'}>
                    <div>Careful - you have unsaved changes!</div>
                    <div>
                        <button className='channel-overview-reset-button' onClick={e => setChannelName(originalChannelName)}>Reset</button>
                        <button className='channel-overview-save-button' onClick={changeChannel}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default ChannelMenu;
