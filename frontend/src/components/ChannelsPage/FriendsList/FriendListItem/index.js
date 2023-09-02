import './FriendListItem.css';

const FriendListItem = ({user}) => {

    return (
        <li key={user.id}>
            {user.username}
        </li>
    )
}

export default FriendListItem;
