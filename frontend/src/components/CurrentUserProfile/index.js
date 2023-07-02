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

    if (!currentUser) return null;

    return (
        <div className="current-user-profile">
            <div>
                {(currentUser.photoUrl) ?
                <img className='user-item-img' src={currentUser.photoUrl} alt={currentUser.username.toUpperCase().charAt(0)}/> :
                ((currentUser.color) ?
                <div style={{backgroundColor: currentUser.color}} className='user-item-img-placeholder'>{`${currentUser.username.toUpperCase().charAt(0)}`}</div> :
                <div className='user-item-img-placeholder'>{`${currentUser.username.toUpperCase().charAt(0)}`}</div>)
                }
                <div className="current-user-text">
                    <div className="current-user-main-text">
                        {currentUser.username}
                    </div>
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
