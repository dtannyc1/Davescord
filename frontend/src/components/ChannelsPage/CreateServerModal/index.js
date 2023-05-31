import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './CreateServerModal.css'

const CreateServerModal = ({visible}) => {
    const dispatch = useDispatch();
    const [newServerName, setNewServerName] = useState('');

    const handleServerCreation = e => {
        e.preventDefault();
    }

    return (
        <div className={(visible) ? "server-modal-holder" : "server-modal-holder hidden"}>
                <div className="server-modal">
                    <div className='server-modal-left-image'>
                        image placeholder
                    </div>

                    <div className="server-modal-main-content">
                        <div className="server-modal-main-top">
                            <h3>Customize your server</h3>
                            <p>Give your new server a personality with a name
                                and an icon. You can always change it later.
                            </p>
                            <img src="#" alt="upload-image"/>
                            <form>
                                <label htmlFor="new-server-input">SERVER NAME </label>

                                <input id="new-server-input" type="text" value={newServerName} onChange={e => setNewServerName(e.target.value)}/>

                            </form>
                        </div>

                        <div className="server-modal-main-exit">
                            <button>X</button>
                        </div>

                        <div className="server-modal-main-bottom">
                            <button className="server-modal-back-button">Back</button>

                            <button className="server-modal-create-button">Create</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateServerModal
