import message from './Messsage.module.css';
import {FC} from "react";

type Props = {
    messageContent: string
}

const Message: FC<Props> = ({messageContent}) => {
    return (
        <div>
            <div className={message.message_item}>{messageContent}</div>
        </div>
    );
}

export default Message;