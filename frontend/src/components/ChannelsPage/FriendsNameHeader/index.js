import './FriendsNameHeader.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const FriendsNameHeader = () => {
    const {serverId, channelId} = useParams();
    // const channel = useSelector(state => state.channels[channelId]);
    const friend = useSelector(state => state.users[channelId]);

    if (!channelId) {
        return (
            <div className='friend-name-holder'>
                <div className='friend-server-name'>
                    <svg className="friend-icon" width="500" height="500" version="1.1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="m272.81 257.02a128 128 0 1 0 0-256 128 128 0 1 0 0 256z"/><path d="m227.11 305.02c-156.61-19.087-108.93-262.09-190.32-245.95s6.5808 247.81 46.555 300.56c39.974 52.755-41.043 118.93-33.449 172.5 2.3014 16.238 10.046 26.357 26.446 26.446l400.53 2.1695c16.4 0.0888 21.022-24.147 21.022-40.547 0-98.5-75.1-191.33-172.88-203.25z"/></svg>
                    Friends
                </div>
            </div>
        )
    } else {
        return (
            // <div className='channel-name-holder'>
            //     <div className='channel-server-name'>
            //         {`${channel?.channelName.replace(/\s+/g, '-').toLowerCase()}`}
            //         <div className='channel-server-description'>{`${channel?.description}`}</div>
            //     </div>

            // </div>
            <>

            </>
        )
    }
}

export default FriendsNameHeader;
