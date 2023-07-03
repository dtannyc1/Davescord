import './ServerDetailsMenu.css'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OverviewMenu from './OverviewMenu';
import { destroyServer } from '../../store/server';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import exitButton from '../../assets/menu-exit-button.svg';

const ServerDetailsMenu = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId} = useParams();
    const [showOverview, setShowOverview] = useState(true);
    // const [showMembers, setShowMembers] = useState(false);
    const currentServer = useSelector(state => state.servers[serverId]);

    const setMenu = menuName => {
        setShowOverview(false)
        // setShowMembers(false)
        switch (menuName) {
            case "overview":
                setShowOverview(true)
                break;
            // case "members":
            //     setShowMembers(true)
            //     break;
            default:
                break;
        }
    }

    const handleDeletion = e => {
        e.preventDefault();
        dispatch(destroyServer(serverId))
        setVisible(false);
        history.push(`/channels/@me`)
    }

    return (
        <div className={visible ? "server-details-menu" : "server-details-menu hidden"}>
            <div className="server-details-left">
                <div className="server-details-sidebar">
                    <ul>
                        <li className="server-details-title">{currentServer?.serverName}</li>
                        <li className={showOverview ? "selected" : null} onClick={e => setMenu("overview")}>Overview</li>
                    </ul>
                    <hr className="server-details-divider"/>
                    {/* <ul>
                        <li className="server-details-title">user management</li>
                        <li className={showMembers ? "selected" : null} onClick={e => setMenu("members")}>Members</li>
                    </ul>
                    <hr className="server-details-divider"/> */}
                    <ul>
                        <li onClick={handleDeletion}>Delete Server</li>
                    </ul>
                </div>
            </div>
            <div className="server-details-right">
                {showOverview ? <OverviewMenu visibility={visible} visibilitySetter={setVisible}/> : null}
                <img src={exitButton} alt="exit icon" className="server-details-exit" onClick={e => setVisible(false)}/>
            </div>
        </div>
    )
}

export default ServerDetailsMenu;
