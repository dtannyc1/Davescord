import './Message.css'

const Message = ({message}) => {
    return (
        <div className='message-holder'>
            {message.body}
        </div>
    )
}

export default Message
