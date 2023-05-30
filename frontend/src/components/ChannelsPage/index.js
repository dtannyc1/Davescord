import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/session";
import { useHistory } from "react-router-dom";

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
            <div>
                Hello from channels page
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default ChannelsPage;
