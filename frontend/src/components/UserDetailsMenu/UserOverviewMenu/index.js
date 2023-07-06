import { useDispatch, useSelector } from 'react-redux';
import './UserOverviewMenu.css'
import { useEffect, useRef, useState } from 'react';
import image_upload from '../../../assets/create_server_image_upload.svg';
import UserItemCard from '../../UserItemCard';

const UserOverviewMenu = ({visibility, visibilitySetter}) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);
    const [newUsername, setNewUsername] = useState(currentUser ? currentUser.username : "");
    const [newColor, setNewColor] = useState(currentUser?.color ? currentUser.color : "")
    const [errors, setErrors] = useState([]);
    const [photoFile, setPhotoFile] = useState(null);
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    useEffect(() => {
        resetInputs();
    }, [currentUser])

    useEffect(() => {
        if (!visibility){
            setNewUsername(currentUser?.username)
            setNewColor(currentUser?.color.slice(0,7))
        }
    }, [visibility])

    const updateUser = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[username]', newUsername);
        formData.append('user[color]', newColor);
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

    const resetInputs = () => {
        setNewUsername(currentUser? currentUser.username : "");
        setNewColor(currentUser?.color.slice(0,7))
        setErrors([]);
    }

    return (
        <div className="overview-menu">
            <h3>User Profile</h3>
            <div className="div-fill">
                <div className="flex-row">
                    <div className='left-option'>
                        <span className='overview-input-title'>Display Name</span>
                        <form>
                            <input className='overview-input'
                                   type='text'
                                   value={newUsername}
                                   onChange={e => setNewUsername(e.target.value)}/>
                        </form>
                        <hr className="user-details-divider"/>
                        <span className='overview-input-title'>Avatar</span>
                        <label htmlFor="user-image-input2" className='user-image-upload-button'>
                                Change Avatar
                                <input type="file" id="user-image-input2" name="file2" accept="image/*" size = "50" onChange={handleFile}/>
                        </label>
                        <hr className="user-details-divider"/>
                        <span className='overview-input-title'>Banner Color</span>
                        <form>
                            <input className='user-color'
                                   type="color"
                                   name="color"
                                   id="color"
                                   value={newColor}
                                   onChange={e => setNewColor(e.target.value)}/>
                        </form>
                    </div>

                    <div className="right-option">
                        {/* <label className="user-image-input" htmlFor="user-image-input">
                            {photoFile ? <img className="user-image-upload" src={URL.createObjectURL(photoFile)} alt="upload"/>
                                : (currentUser?.photoUrl ? <img className="user-image" src={currentUser.photoUrl} alt="upload"/>
                                : <img className="user-image-upload" src={image_upload} alt="upload"/>)}
                            <input type="file" id="user-image-input" name="file3" accept="image/*" onChange={handleFile}/>
                        </label>
                        <div>
                            We recommend an image of at least 512x512 for the user.

                        </div> */}
                        <UserItemCard color={newColor} imageSrc={photoFile ? URL.createObjectURL(photoFile) : (currentUser?.photoUrl ? currentUser.photoUrl : image_upload)}/>
                    </div>

                </div>
                <div className={((currentUser?.username === newUsername || newUsername?.length === 0 )
                                && (!photoFile)
                                && (currentUser?.color.slice(0,7) === newColor)) ?
                        'save-button-holder hidden' : 'save-button-holder'}>
                    <div className="save-button-text">Careful - you have unsaved changes!</div>
                    <div className="buttons">
                        <button className='overview-reset-button' onClick={resetInputs}>Reset</button>
                        <button className='overview-save-button' onClick={updateUser}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default UserOverviewMenu;
