import './UserItem.css'

const UserItem = ({user}) => {
    if (!user) return null;
    return (
        <div className='user-item'>
            <img className='user-item-img' src={user.profilePicture} alt={user.username}/>
            <div className='user-item-text'>
                {user.username}
            </div>
        </div>
    )
}

export default UserItem
