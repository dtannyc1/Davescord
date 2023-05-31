import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './CreateServerModal.css'
import background from '../../../assets/create_server_background.svg';
import image_upload from '../../../assets/create_server_image_upload.svg';
import { createServer } from "../../../store/server";
import { useEffect } from "react";

const CreateServerModal = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);
    let defaultServerName = (currentUser) ? `${currentUser.username}'s server` : '';
    const [newServerName, setNewServerName] = useState(defaultServerName);

    const handleServerCreation = e => {
        e.preventDefault();

        if (newServerName.length > 0) {
            let server = {server_name: newServerName}
            dispatch(createServer(server))
            setNewServerName(defaultServerName);
            setVisible(false)
        }
    }

    useEffect(() => {
        defaultServerName = (currentUser) ? `${currentUser.username}'s server` : '';
        setNewServerName(defaultServerName);
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
                            <img className="server-modal-image-upload" src={image_upload} alt="upload-image"/>
                            <form>
                                <label htmlFor="new-server-input">SERVER NAME </label>

                                <input id="new-server-input" type="text" value={newServerName} onChange={e => setNewServerName(e.target.value)}/>

                            </form>
                        </div>

                        <div className="server-modal-main-exit">
                            <button onClick={e => {setNewServerName(defaultServerName); setVisible(false)}}>X</button>
                        </div>

                        <div className="server-modal-main-bottom">
                            <button className="server-modal-back-button" onClick={e => {setNewServerName(defaultServerName); setVisible(false)}}>Back</button>

                            <button className="server-modal-create-button" onClick={handleServerCreation}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateServerModal
