import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './CreateChannelModal.css'
import { createChannel } from "../../../store/channel";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const CreateChannelModal = ({visible, setVisible}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId} = useParams();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);
    const [newChannelName, setNewChannelName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleChannelCreation = async e => {
        e.preventDefault();

        if (newChannelName.length > 0) {
            let channel = {
                channel_name: newChannelName,
                serverId: serverId,
                categoryName: newCategoryName,
                description: newDescription
            }
            let newChannel = await dispatch(createChannel(channel))
            setNewChannelName('');
            setVisible(false)
            history.push(`/channels/${newChannel.id}`)
        }
    }

    return (
        <div className={(visible) ? "channel-modal-holder" : "channel-modal-holder hidden"}>
                <div className="channel-modal">
                    <div className="channel-modal-main-content">
                        <div className="channel-modal-main-top">
                            <h3>Create Channel</h3>
                            <p>Send messages, images, GIFs, emoji, opinions, and puns
                            </p>
                            <form>
                                <label htmlFor="new-channel-name-input">channel name</label>
                                <input id="new-channel-name-input" type="text" value={newChannelName} placeholder="new-channel" onChange={e => setNewChannelName(e.target.value)}/>

                                <label htmlFor="new-channel-category-input">category </label>
                                <input id="new-channel-category-input" type="text" value={newCategoryName} placeholder="category" onChange={e => setNewCategoryName(e.target.value)}/>

                                <label htmlFor="new-channel-description-input">description </label>
                                <input id="new-channel-description-input" type="textarea" value={newDescription} placeholder="description" onChange={e => setNewDescription(e.target.value)}/>

                            </form>
                        </div>

                        <div className="channel-modal-main-exit">
                            <button onClick={e => {setNewChannelName(''); setVisible(false)}}>X</button>
                        </div>

                        <div className="channel-modal-main-bottom">
                            <button className="channel-modal-back-button" onClick={e => {setNewChannelName(''); setVisible(false)}}>Cancel</button>

                            <button className="channel-modal-create-button" onClick={handleChannelCreation}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateChannelModal;
