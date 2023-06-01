import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './OverviewMenu.css'
import { useEffect, useState } from 'react';

const OverviewMenu = () => {
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    const [serverName, setServerName] = useState(currentServer ? currentServer.serverName : '');

    useEffect(() => {
        setServerName(currentServer?.serverName)
    }, [currentServer])

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
            </div>
        </div>
        )
}

export default OverviewMenu;
