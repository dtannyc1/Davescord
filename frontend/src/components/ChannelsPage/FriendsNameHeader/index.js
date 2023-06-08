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
                    <svg className='friend-icon' width="500" height="500" version="1.1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                        <path d="m272.81 257.02a128 128 0 1 0 0-256 128 128 0 1 0 0 256z"/>
                        <path d="m159.86 277.56c-80.738-49.573-41.678-274.77-115.47-259.71-73.796 15.058 0.22648 304.93 36.08 353.08 35.853 48.152-38.161 107.63-30.567 161.21 2.3014 16.238 10.046 26.357 26.446 26.446l400.53 2.1695c16.4 0.0888 25.637-24.81 21.022-40.547-30.681-104.64-52.976-175.31-159.07-199.17-49.852-11.214-125.04-10.355-178.97-43.467z"/>
                    </svg>
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
