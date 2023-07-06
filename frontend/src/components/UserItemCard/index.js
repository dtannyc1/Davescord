import './UserItemCard.css';

const UserItemCard = ({user, color, imageSrc, footer}) => {
    return (
        <div className='user-card'>
            <div className='user-card-banner' style={{backgroundColor: `${color}`}}></div>
            <div className='user-card-image-holder'>
                <img className='user-card-image' src={imageSrc} />
            </div>
            <div className='user-card-data'>

                {footer? footer : <></>}
            </div>
        </div>
    )
}

export default UserItemCard;
