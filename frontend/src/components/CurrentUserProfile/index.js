import "./CurrentUserProfile.css"
import { useSelector } from "react-redux";

const CurrentUserProfile = () => {
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);

    return (
        <div className="current-user-profile">
            placeholder
        </div>
    )
}

export default CurrentUserProfile;
