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
    const sortedPrivateChats = useRef(Object.keys(privateChats));

    useEffect(() => {
        dispatch(fetchPrivateChats())
    }, [dispatch, currentUserId])

    useEffect(() => {
        sortedPrivateChats.current = Object.keys(privateChats).sort((a,b) =>{
            let recA = privateChats[a].messages[privateChats[a].messages.length-1];
            let recB = privateChats[b].messages[privateChats[b].messages.length-1];
            if (recA < recB) return 1;
            if (recB < recA) return -1;
            return 0;
        })
    }, [privateChats])

    return (
        <div className="private-chats-list-holder">
            <div className='channels-category-name'>Direct Messages</div>
            {privateChats && sortedPrivateChats.current ? sortedPrivateChats.current.map(privateChatId => {
                return (
                    <PrivateChatItem privateChat={privateChats[privateChatId]}/>
                )
            }) : <></>}
        </div>
    )
}

export default PrivateChatsList;
