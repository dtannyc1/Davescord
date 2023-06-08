import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './OverviewMenu.css'
import { useEffect, useRef, useState } from 'react';
import { updateServer } from '../../../store/server';

const OverviewMenu = ({visibility, visibilitySetter}) => {
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    let originalServerName = useRef(currentServer ? currentServer.serverName : '');
    const [serverName, setServerName] = useState(originalServerName.current);

    useEffect(() => {
        originalServerName.current =  currentServer ? currentServer.serverName : '';
        setServerName(originalServerName.current)
    }, [currentServer])

    useEffect(() => {
        if (!visibility){
            setServerName(originalServerName.current);
        }
    }, [visibility])

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
                    <span className='overview-input-title'>server name</span>
                    <form>
                        <input className='overview-input' type='text' value={serverName} onChange={e => setServerName(e.target.value)}/>
                    </form>
                </div>
                <div className={(originalServerName.current === serverName) ?
                        'save-button-holder hidden' : 'save-button-holder'}>
                    <div className="save-button-text">Careful - you have unsaved changes!</div>
                    <div className="buttons">
                        <button className='overview-reset-button' onClick={e => setServerName(originalServerName.current)}>Reset</button>
                        <button className='overview-save-button' onClick={changeServer}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default OverviewMenu;
