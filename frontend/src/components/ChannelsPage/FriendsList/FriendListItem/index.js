import './FriendListItem.css';

const FriendListItem = ({user}) => {

    return (
        <li key={user.id} className="friend-list-item">
            <div>
                {(user.photoUrl) ?
                    <img className='friend-item-img' src={user.photoUrl} alt={user.username.toUpperCase().charAt(0)}/> :
                    ((user.color) ?
                    <div style={{backgroundColor: user.color}} className='friend-item-img-placeholder'>{`${user.username.toUpperCase().charAt(0)}`}</div> :
                    <div className='friend-item-img-placeholder'>{`${user.username.toUpperCase().charAt(0)}`}</div>)
                }
            </div>
            <div>
                <div className="friend-list-username">
                    {user.username}
                </div>
                <div className="friend-list-status">
                    {user.status ? user.status : "Idle"}
                </div>
            </div>
        </li>
    )
}

export default FriendListItem;
