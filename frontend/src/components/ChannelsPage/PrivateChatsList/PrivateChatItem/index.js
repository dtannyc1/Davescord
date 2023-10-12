import { useEffect, useRef, useState } from 'react';
import './PrivateChatItem.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from '../../../../store/user';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PrivateChatItem = ({privateChat}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {channelId} = useParams();
    const users = useSelector(state => state.users);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const [otherUserId, setOtherUserId] = useState(null);

    useEffect(() => {
        if (privateChat.user1Id === currentUserId){
            if (privateChat.user2Id && !users[privateChat.user2Id]){
                dispatch(fetchUser(privateChat.user2Id))
            }
            setOtherUserId(privateChat.user2Id);
        } else {
            if (privateChat.user1Id && !users[privateChat.user1Id]){
                dispatch(fetchUser(privateChat.user1Id))
            }
            setOtherUserId(privateChat.user1Id);
        }
    }, [dispatch, privateChat])

    let handleClick = function(e){
        e.stopPropagation();
        if (parseInt(privateChat.id) !== channelId){
            history.push(`/channels/@me/${parseInt(privateChat.id)}`)
        }
    }

    return (
        <>
        {users[otherUserId] ?
            <div key={users[otherUserId]?.id} className='private-chat-item' onClick={e => handleClick(e)}>
                {(users[otherUserId]?.photoUrl) ?
                    <img className='user-item-img' src={users[otherUserId]?.photoUrl} alt={users[otherUserId]?.username.toUpperCase().charAt(0)}/> :
                    ((users[otherUserId]?.color) ?
                        <div style={{backgroundColor: users[otherUserId]?.color}} className='user-item-img-placeholder'>{`${users[otherUserId]?.username.toUpperCase().charAt(0)}`}</div> :
                        <div className='user-item-img-placeholder'>{`${users[otherUserId]?.username.toUpperCase().charAt(0)}`}</div>)
                }
                <div className='private-chat-item-text'>
                    {users[otherUserId]?.username}
                </div>
            </div>
        : <></>}
        </>
    )
}

export default PrivateChatItem;
