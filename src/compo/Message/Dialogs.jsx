import message from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from "./MessagesItem/Message";
import {createRef} from "react";
import {Navigate} from "react-router-dom"

function Dialogs(props) {

    let state = props.dialogsPage;

    let dialogsElements =
        state.dialogsData.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />)
    let messagesElements =
        state.messagesData.map(m => <Message ava={m.ava} key={m.id} id={m.id} content={m.message}/>)
    let newMessageText = state.newMessageText;

    let newMessageElement = createRef();

    let OnClickSendMessage = () => {
        props.SendMessageActionCreater();
    }

    let OnNewMessageSend = (e) => {
        let body = e.target.value;
        props.UpdateNewMessageActionCreater(body);
    }

/*    if (props.isAuth === false) {
        return <Navigate to={'/login'} />
    }*/

    return (
        <div className={message.dialogs}>
            <div className={message.notify}>
                {dialogsElements}
            </div>
            <div className={message.paper_dial}>
                {messagesElements}
            </div>
            <div>
                <textarea onChange={OnNewMessageSend} ref={newMessageElement} value={newMessageText}
                          placeholder={"Enter your message"}/>
            </div>
            <div>
                <button onClick={OnClickSendMessage}>Send Message</button>
            </div>
        </div>
    );
}

export default Dialogs
