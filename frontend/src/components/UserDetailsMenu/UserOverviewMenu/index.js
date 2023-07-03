import { useDispatch, useSelector } from 'react-redux';
import './UserOverviewMenu.css'
import { useEffect, useRef, useState } from 'react';
import image_upload from '../../../assets/create_server_image_upload.svg';

const UserOverviewMenu = ({visibility, visibilitySetter}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);
    const [newUsername, setNewUsername] = useState(currentUser? currentUser.username : "");
    const [newEmail, setNewEmail] = useState(currentUser?.email);
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [errors, setErrors] = useState([]);
    const [photoFile, setPhotoFile] = useState(null);
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    useEffect(() => {
        setNewUsername(currentUser? currentUser.username : "");
        setNewEmail(currentUser?.email);
        setNewPassword('');
        setNewPassword2('');
        setErrors([]);
    }, [currentUser])

    useEffect(() => {
        if (!visibility){
            setNewUsername(currentUser?.username)
        }
    }, [visibility])

    const updateUser = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[username]', newUsername);
        formData.append('user[email]', newEmail);
        formData.append('user[password]', newPassword);
        if (photoFile) {
            formData.append('user[photo]', photoFile)
        }
        // currentServer.serverName = serverName;
        // dispatch(updateServer(formData, serverId));
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
            <h3>Overview</h3>
            <div>
                <div className="flex-row">
                    <div className="left-option">
                        <label className="user-image-input" htmlFor="user-image-input">
                            {photoFile ? <img className="user-image-upload" src={URL.createObjectURL(photoFile)} alt="upload"/>
                                : (currentUser?.photoUrl ? <img className="user-image" src={currentUser.photoUrl} alt="upload"/>
                                : <img className="user-image-upload" src={image_upload} alt="upload"/>)}
                            <input type="file" id="user-image-input" name="file3" accept="image/*" onChange={handleFile}/>
                        </label>
                        <div>
                            We recommend an image of at least 512x512 for the user.
                            <label htmlFor="user-image-input2" className='user-image-upload-button'>
                                Upload Image
                                <input type="file" id="user-image-input2" name="file2" accept="image/*" size = "50" onChange={handleFile}/>
                            </label>
                        </div>
                    </div>
                    <div className='right-option'>
                        <span className='overview-input-title'>user name</span>
                        <form>
                            <input className='overview-input' type='text' value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                        </form>
                        <span className='overview-input-title'>Email</span>
                        <form>
                            <input className='overview-input' type='text' value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                        </form>
                        <span className='overview-input-title'>Password</span>
                        <form>
                            <input className='overview-input' type='text' value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                        </form>
                    </div>
                </div>
                <div className={((currentUser?.username === newUsername || newUsername?.length === 0 ) && (!photoFile)) ?
                        'save-button-holder hidden' : 'save-button-holder'}>
                    <div className="save-button-text">Careful - you have unsaved changes!</div>
                    <div className="buttons">
                        <button className='overview-reset-button' onClick={e => {setPhotoFile(null); setNewUsername(currentUser?.username)}}>Reset</button>
                        <button className='overview-save-button' onClick={updateUser}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default UserOverviewMenu;