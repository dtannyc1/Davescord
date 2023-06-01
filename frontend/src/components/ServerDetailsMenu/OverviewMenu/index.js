import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './OverviewMenu.css'
import { useEffect, useState } from 'react';
import { updateServer } from '../../../store/server';

const OverviewMenu = ({visibilitySetter}) => {
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    const [serverName, setServerName] = useState(currentServer ? currentServer.serverName : '');
    let originalServerName = currentServer?.serverName;

    useEffect(() => {
        originalServerName = currentServer?.serverName;
        setServerName(originalServerName)
    }, [currentServer])

    const changeServer = e => {
        e.preventDefault();
        currentServer.serverName = serverName;
        dispatch(updateServer(currentServer));
        visibilitySetter(false);
    }

    return (
        <div className="overview-menu">
            <h3>Server Overview</h3>
            <div>
                <div>
                    {/* change server picture */}
                </div>
                <div>
                    <span className='overview-input-title'>server name</span>
                    <form>
                        <input className='overview-input' type='text' value={serverName} onChange={e => setServerName(e.target.value)}/>
                    </form>
                </div>
                <div className={(originalServerName === serverName) ? 'save-button-holder hidden' : 'save-button-holder'}>
                    <div>Careful - you have unsaved changes!</div>
                    <div>
                        <button className='overview-reset-button' onClick={e => setServerName(originalServerName)}>Reset</button>
                        <button className='overview-save-button' onClick={changeServer}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default OverviewMenu;
