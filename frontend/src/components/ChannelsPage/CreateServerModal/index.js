import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import './CreateServerModal.css'
import background from '../../../assets/create_server_background.svg';
import image_upload from '../../../assets/create_server_image_upload.svg';
import { createServer} from "../../../store/server";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addChannel, createChannel } from "../../../store/channel";
import { useContext } from "react";
import { WebsocketContext } from "../../../App";

const CreateServerModal = ({visible, setVisible, setWebsocketRestart}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);
    let defaultServerName = useRef((currentUser) ? `${currentUser.username}'s server` : '');
    const [newServerName, setNewServerName] = useState(defaultServerName);
    const [photoFile, setPhotoFile] = useState(null);
    const websocketRestart = useContext(WebsocketContext);
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const handleServerCreation = async e => {
        e.preventDefault();

        if (newServerName.length > 0) {
            const formData = new FormData();
            formData.append('server[server_name]', newServerName);
            if (photoFile) {
                formData.append('server[photo]', photoFile)
            }
            // let server = {server_name: newServerName}
            let newServer = await dispatch(createServer(formData))
            let channel = {
                channel_name: "general",
                serverId: newServer.server.id,
                categoryName: "Text Channels",
                description: ""
            }

            debugger
            setNewServerName(defaultServerName.current);
            setPhotoFile(null);
            setVisible(false)
            let newChannel = await dispatch(createChannel(channel))
            dispatch(addChannel(newChannel))

            history.push(`/channels/${newServer.server.id}/${newChannel.id}`)

            setWebsocketRestart(!websocketRestart) // force restart websockets
        }
    }

    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        if (file && validImageTypes.includes(file['type'])){
            setPhotoFile(file);
        } else {
            setPhotoFile(null);
        }
    }

    useEffect(() => {
        defaultServerName.current = (currentUser) ? `${currentUser.username}'s server` : '';
        setNewServerName(defaultServerName.current);
    }, [currentUser])

    return (
        <div className={(visible) ? "server-modal-holder" : "server-modal-holder hidden"}>
                <div className="server-modal">
                    <div className='server-modal-left-image'>
                        <img src={background} alt="create-server-background"/>
                    </div>

                    <div className="server-modal-main-content">
                        <div className="server-modal-main-top">
                            <h3>Customize your server</h3>
                            <p>Give your new server a personality with a name
                                and an icon. You can always change it later.
                            </p>
                            <label htmlFor="file-input">
                                {photoFile ? <img className="server-modal-uploaded-image" src={URL.createObjectURL(photoFile)} alt="upload"/>
                                    : <img className="server-modal-image-upload" src={image_upload} alt="upload"/>}
                            </label>
                            <input type="file" id="file-input" name="file" accept="image/*" onChange={handleFile} />
                            <form>
                                <label htmlFor="new-server-input">SERVER NAME </label>

                                <input id="new-server-input" type="text" value={newServerName} onChange={e => setNewServerName(e.target.value)}/>
                            </form>
                        </div>

                        <div className="server-modal-main-exit">
                            <button onClick={e => {setNewServerName(defaultServerName.current); setPhotoFile(null); setVisible(false)}}>X</button>
                        </div>

                        <div className="server-modal-main-bottom">
                            <button className="server-modal-back-button" onClick={e => {setNewServerName(defaultServerName.current); setPhotoFile(null); setVisible(false)}}>Back</button>

                            <button className="server-modal-create-button" disabled={(newServerName.length > 0) ? null : true} onClick={handleServerCreation}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateServerModal
