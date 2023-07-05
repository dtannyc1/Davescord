import './UserDetailsMenu.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../store/session";
import UserOverviewMenu from './UserOverviewMenu';
import exitButton from '../../assets/menu-exit-button.svg';

const UserDetailsMenu = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showOverview, setShowOverview] = useState(true);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);

    const setMenu = menuName => {
        setShowOverview(false)
        switch (menuName) {
            case "overview":
                setShowOverview(true)
                break;
            default:
                break;
        }
    }

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logoutUser(currentUserId))
        history.push('/')
    }

    return (
        <div className={visible ? "user-details-menu" : "user-details-menu hidden"}>
            <div className="user-details-left">
                <div className="user-details-sidebar">
                    <ul>
                        <li className="user-details-title">User Settings</li>
                        <li className={showOverview ? "selected" : null} onClick={e => setMenu("overview")}>Profile</li>
                    </ul>
                    <hr className="user-details-divider"/>
                    <ul>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                    <hr className="user-details-divider"/>
                </div>
            </div>
            <div className="user-details-right">
                {showOverview ? <UserOverviewMenu visibility={visible} visibilitySetter={setVisible}/> : null}
                <img src={exitButton} alt="exit icon" className="user-details-exit" onClick={e => setVisible(false)}/>
            </div>
        </div>
    )
}

export default UserDetailsMenu;
