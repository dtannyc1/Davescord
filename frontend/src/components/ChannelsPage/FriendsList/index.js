import { useState } from 'react';
import './FriendsList.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FriendListItem from './FriendListItem';

const FriendsList = () => {
    // this component shows all friends
    // only visible when /channels/@me
    // should render a list of all friends
        // search bar at top
        // "Online - 23" should show how many friends have an online status?
        // a list of all friends underneath

    const friendsList = useSelector(state => state.friends);
    const userList = useSelector(state => state.users);

    return (
        <>
            {/* <div>Online - 23</div> */}
            <ul className='friends-list'>
                {Object.values(friendsList).map(friend => {
                    if (userList[friend.userId]) {
                        return <FriendListItem user={userList[friend.userId]}/>
                    } else {
                        return <></>
                    }
                })}
            </ul>
        </>
    )
}

export default FriendsList;
