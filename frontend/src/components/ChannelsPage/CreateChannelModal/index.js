import { useDispatch } from "react-redux";
import { useState } from "react";
import './CreateChannelModal.css'
import { createChannel } from "../../../store/channel";
// import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { WebsocketContext } from "../../../App";

const CreateChannelModal = ({visible, setVisible, categoryName, setWebsocketRestart}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId} = useParams();
    // const currentUserId = useSelector(state => state.session.currentUserId);
    // const currentUser = useSelector(state => state.users[currentUserId]);
    const [newChannelName, setNewChannelName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState(categoryName ? categoryName.current : '');
    const [newDescription, setNewDescription] = useState('');
    const websocketRestart = useContext(WebsocketContext);

    useEffect(() => {
        setNewCategoryName(categoryName ? categoryName.current : '');
    }, [categoryName])

    const handleChannelCreation = async e => {
        e.preventDefault();

        if (newChannelName.length > 0) {
            let channel = {
                channel_name: newChannelName,
                serverId: serverId,
                categoryName: newCategoryName,
                description: newDescription
            }
            dispatch(createChannel(channel)).then(newChannel => {
                closeMenu();
                history.push(`/channels/${serverId}/${newChannel.id}`)
                setWebsocketRestart(!websocketRestart) // force restart websockets
            })
        }
    }

    const closeMenu = () => {
        setNewChannelName('');
        setNewCategoryName(categoryName ? categoryName.current : '');
        setNewDescription('');
        setVisible(false);
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
                                <input id="new-channel-name-input" type="text" value={newChannelName.replace(/\s+/g, '-').toLowerCase()} placeholder="new-channel" onChange={e => setNewChannelName(e.target.value)}/>
                                <div className="new-channel-hashtag">#</div>

                                <label htmlFor="new-channel-category-input">category </label>
                                <input id="new-channel-category-input" type="text" value={newCategoryName} placeholder="Category" onChange={e => setNewCategoryName(e.target.value)}/>

                                <label htmlFor="new-channel-description-input">channel topic </label>
                                <input id="new-channel-description-input" type="textarea" value={newDescription} placeholder="Let everyone know how to use this channel!" onChange={e => setNewDescription(e.target.value)}/>

                            </form>
                        </div>

                        <div className="channel-modal-main-exit">
                            <button onClick={closeMenu}>X</button>
                        </div>

                        <div className="channel-modal-main-bottom">
                            <button className="channel-modal-back-button" onClick={closeMenu}>Cancel</button>

                            <button className="channel-modal-create-button" disabled={(newChannelName.length > 0 && newCategoryName.length > 0) ? null : true} onClick={handleChannelCreation}>Create Channel</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateChannelModal;
