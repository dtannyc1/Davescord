import "./CurrentUserProfile.css"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/session";
import { useHistory } from "react-router-dom";


const CurrentUserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logoutUser(currentUserId))
        history.push('/')
    }

    return (
        <div className="current-user-profile">
            <div>
                <img src={currentUser.profilePicture} alt={currentUser.name}/>
                <div>
                    {currentUser.username}
                    <div className="current-profile-small-text">
                        {currentUser.username}#{currentUserId.toString().padStart(4,'0')}
                    </div>
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default CurrentUserProfile;
