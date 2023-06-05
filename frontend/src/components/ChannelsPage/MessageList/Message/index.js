import './Message.css'
import { useSelector } from 'react-redux';

const Message = ({message}) => {
    const users = useSelector(state => state.users);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const today = new Date();
        const startOfToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).getTime();

        const startOfYesterday = startOfToday - (1000 * 60 * 60 * 24);

        const formattedTime = date.toLocaleTimeString([], {timeStyle: 'short'}) // "1:15 AM"

        let formattedDateTime;

        if (date.getTime() > startOfToday) {
            formattedDateTime = `Today at ${formattedTime}`;
        } else if (date.getTime() > startOfYesterday) {
            formattedDateTime = `Yesterday at ${formattedTime}`;
        } else {
            formattedDateTime = `${date.toLocaleDateString()} ${formattedTime}`;
        }
        return formattedDateTime
    }

    return (
        <div className='message-holder'>
            <img className='user-item-img' src={users[message.authorId].profilePicture} alt={users[message.authorId].username}/>
            <div className='message-main'>
                <span className='message-user-info'>
                    {users[message.authorId].username}
                    <span className='message-datetime'>{formatDate(message.createdAt)}</span>
                </span>
                <span className='message-body'>{message.body}</span>
            </div>
        </div>
    )
}

export default Message
