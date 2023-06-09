import { useDispatch,useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import './ServerNameHeader.css';
import { useState, useEffect } from "react";
import { removeSubscription } from "../../../store/subscription";


const ServerNameHeader = ({setDetailVisibility, showCreateChannel, categoryName}) => {
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    const [visible, setVisible] = useState(false);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const history = useHistory();


    useEffect(() => {
        const hideDetails = e => {
            if (e.target.className !== "server-details-dropdown" && visible) {
                e.preventDefault();
                e.stopPropagation();
                setVisible(false);
            }
        }

        document.removeEventListener('click', hideDetails)
        document.addEventListener('click', hideDetails)

        return e => document.removeEventListener('click', hideDetails)
    }, [visible])

    const openSettingsPage = e => {
        e.preventDefault()
        e.stopPropagation();
        setDetailVisibility(true);
        setVisible(false);
    }

    const openCreateChannel = e => {
        e.preventDefault();
        categoryName.current = "general";
        showCreateChannel(true);
        setVisible(false);
    }

    const leaveServer = e => {
        e.preventDefault();
        e.stopPropagation();
        // logic for leaving a server
        dispatch(removeSubscription(serverId))
        history.push('/channels/@me')
    }

    return (
        <>
            <div className="server-name-holder" onClick={e => setVisible(true)}>
                <div className="server-name">{currentServer?.serverName}</div>
                <div className="server-fake-dropdown">v</div>
            </div>
            <div className={visible ? "server-details-holder" : "server-details-holder hidden"}>
                <div className="server-details-dropdown">
                    { (currentServer?.ownerId === currentUserId) ?
                        <>
                        <div className="server-details-option" onClick={openCreateChannel}>
                            <span>Add a Channel</span>
                            <svg width="15" height="15" version="1.1" viewBox="0 0 3.9687 3.9688" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 -293.03)" stroke-width=".52917">
                                    <path d="m1.9844 293.03v3.9688"/>
                                    <path d="m0 295.02h3.9688"/>
                                </g>
                            </svg>
                        </div>
                        <div className="server-details-option" onClick={openSettingsPage}>
                            <span>Server Settings</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                            </svg>
                        </div>
                        </>:
                        <div className="server-leave-option" onClick={leaveServer}>
                            <span>Leave Server</span>
                            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 -270.54)">
                                    <path transform="matrix(.26458 0 0 .26458 0 270.54)" d="m50 0c-27.614 0-50 22.386-50 50s22.386 50 50 50c24.816-0.02548 45.711-18.215 49.381-42.5h-54.381v12.5l-27.094-20 27.094-20v12.5h54.432c-3.673-24.309-24.601-42.499-49.432-42.5z"/>
                                </g>
                            </svg>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ServerNameHeader;
