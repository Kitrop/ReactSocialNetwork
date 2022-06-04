import message from './Messsage.module.css';

function Message(props) {
    return (
        <div>
            <div className={message.message_item}>{props.content}</div>
        </div>
    );
}

export default Message;