import { useEffect, useRef, useState } from 'react';
import './PrivateChatsList.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPrivateChats } from '../../../store/privatechats';
import PrivateChatItem from './PrivateChatItem';

const PrivateChatsList = () => {
    const currentUserId = useSelector(state => state.session.currentUserId);
    const dispatch = useDispatch();
    const privateChats = useSelector(state => state.privateChats);

    useEffect(() => {
        dispatch(fetchPrivateChats())
    }, [dispatch, currentUserId])

    return (
        <div className="private-chats-list-holder">
            <div className='channels-category-name'>Direct Messages</div>
            {privateChats ? Object.values(privateChats).map(privateChat => {
                return (
                    <PrivateChatItem privateChat={privateChat}/>
                )
            }) : <></>}
        </div>
    )
}

export default PrivateChatsList;
