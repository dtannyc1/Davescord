import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/session";
import { useHistory } from "react-router-dom";
import './ChannelsPage.css'

const ChannelsPage = ({server_id, channel_id, private_chat_id}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const history = useHistory();

    if (private_chat_id) console.log(private_chat_id);
    if (server_id) console.log(server_id);
    if (channel_id) console.log(channel_id);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logoutUser(currentUserId))
        history.push('/')
    }

    return (
        <div className="channels-page">
            <div className="channels-column1">
                {/* logo  */}
                {/* server list */}
            </div>
            <div className="channels-column2">
                Hello from channels page
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="channels-column3">

            </div>
        </div>
    )
}

export default ChannelsPage;
