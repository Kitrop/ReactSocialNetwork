import message from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from "./MessagesItem/Message";
import {createRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessage} from "../../redux/dialogSelectors";
import {Formik, Field} from "formik";
import DialogsForm from "./DialogsForm";
import {SendMessageActionCreater} from "../../redux/dialogsReducer";

function Dialogs(props) {

    const dialogsPage = useSelector(getMessage)
    const dispatch = useDispatch()


    let dialogsElements = dialogsPage.dialogsData.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />)
    let messagesElements = dialogsPage.messagesData.map(m => <Message ava={m.ava} key={m.id} id={m.id} content={m.message}/>)

    let newMessageText = dialogsPage.newMessageText;
    let newMessageElement = createRef();
    let OnClickSendMessage = () => {
        props.SendMessageActionCreater();
    }
    let OnNewMessageSend = (e) => {
        let body = e.target.value;
        props.UpdateNewMessageActionCreater(body);
    }

    return (
        <div className={message.dialogs}>
            <div className={message.notify}>
                {dialogsElements}
            </div>
            <div className={message.paper_dial}>
                {messagesElements}
            </div>
            <DialogsForm SendMessageActionCreater={props.SendMessageActionCreater}/>
        </div>
    );
}

export default Dialogs
