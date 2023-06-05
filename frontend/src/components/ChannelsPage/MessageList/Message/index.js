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
            {users[message.authorId].username}: {message.body}, {formatDate(message.createdAt)}
        </div>
    )
}

export default Message
