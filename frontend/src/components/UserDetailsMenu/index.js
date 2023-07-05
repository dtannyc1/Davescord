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

    const openExternalLink = (e, link) => {
        e.preventDefault();
        window.open(link, "_blank")
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
                    <ul className="user-details-logout-button">
                        <li onClick={handleLogout}>
                            <div>Logout</div>
                            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 -270.54)">
                                    <path transform="matrix(.26458 0 0 .26458 0 270.54)" d="m50 0c-27.614 0-50 22.386-50 50s22.386 50 50 50c24.816-0.02548 45.711-18.215 49.381-42.5h-54.381v12.5l-27.094-20 27.094-20v12.5h54.432c-3.673-24.309-24.601-42.499-49.432-42.5z"/>
                                </g>
                            </svg>
                        </li>
                    </ul>
                    <hr className="user-details-divider"/>
                    <div className='dev-links-holder'>
                        <a href='https://www.linkedin.com/in/dtannyc1/'
                            onClick={e => openExternalLink(e, 'https://www.linkedin.com/in/dtannyc1/')}>
                            <i className="fa-brands fa-linkedin fa-xl"></i>
                        </a>

                        <a href='https://wellfound.com/u/david-tan-47'
                            onClick={e => openExternalLink(e, 'https://wellfound.com/u/david-tan-47')}>
                            <i className="fa-brands fa-angellist fa-xl"></i>
                        </a>

                        <a href='https://github.com/dtannyc1'
                            onClick={e => openExternalLink(e, 'https://github.com/dtannyc1')}>
                            <i className="fa-brands fa-github fa-xl"></i>
                        </a>
                    </div>
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
