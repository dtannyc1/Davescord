import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import './OverviewMenu.css'
import { useEffect, useRef, useState } from 'react';
import { updateServer } from '../../../store/server';
import image_upload from '../../../assets/create_server_image_upload.svg';

const OverviewMenu = ({visibility, visibilitySetter}) => {
    const dispatch = useDispatch();
    const {serverId} = useParams();
    const currentServer = useSelector(state => state.servers[serverId]);
    let originalServerName = useRef(currentServer ? currentServer.serverName : '');
    const [serverName, setServerName] = useState(originalServerName.current);
    const [photoFile, setPhotoFile] = useState (null);
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    useEffect(() => {
        originalServerName.current =  currentServer ? currentServer.serverName : '';
        setServerName(originalServerName.current);
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

    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        if (file && validImageTypes.includes(file['type'])){
            setPhotoFile(file);
        } else {
            setPhotoFile(null);
        }
    }

    return (
        <div className="overview-menu">
            <h3>Server Overview</h3>
            <div>
                <div className="flex-row">
                    <div className="left-option">
                        <label htmlFor="server-image-input" onClick={() => console.log('click')}>
                            {photoFile ? <img className="server-image-upload" src={URL.createObjectURL(photoFile)} alt="upload"/>
                                : (currentServer?.photoUrl ? <img className="server-image" src={currentServer.photoUrl} alt="upload"/>
                                : <img className="server-image-upload" src={image_upload} alt="upload"/>)}
                        </label>
                        <form>
                            <input type="file" id="server-image-input" name="file" accept="image/*" onChange={handleFile}/>
                        </form>
                        <div>
                            We recommend an image of at least 512x512 for the server.
                        </div>
                    </div>
                    <div>
                        <span className='overview-input-title'>server name</span>
                        <form>
                            <input className='overview-input' type='text' value={serverName} onChange={e => setServerName(e.target.value)}/>
                        </form>
                    </div>
                </div>
                <div className={(originalServerName.current === serverName || serverName.length === 0) ?
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
