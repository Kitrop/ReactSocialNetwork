import message from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from "./MessagesItem/Message";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getMessage} from "../../redux/selectors/dialogSelectors";
import DialogsForm from "./DialogsForm";
import {useNavigate} from "react-router-dom";
import {SendMessageActionCreater} from '../../redux/reducers/dialogsReducer'

function Dialogs(props) {

    // STATE
    const dialogsPage = useSelector( state => getMessage(state))
    const isAuth = useSelector( state => getIsAuth(state))

    // if user not login redirect to /login
    let navigator = useNavigate()
    useEffect(() => {
        if (isAuth === false) {
            return navigator('/login')
        }
    }, [isAuth, navigator]);


    let dialogsElements = dialogsPage.dialogsData.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />)
    let messagesElements = dialogsPage.messagesData.map(m => <Message ava={m.ava} key={m.id} id={m.id} content={m.message}/>)



    const dispatch = useDispatch()
    const sendMsgAC = (newMessageText) => {dispatch(SendMessageActionCreater(newMessageText))}

    return (
        <div className={message.dialogs}>
            <div className={message.notify}>
                {dialogsElements}
            </div>
            <div className={message.paper_dial}>
                {messagesElements}
            </div>
            <DialogsForm SendMessageActionCreater={sendMsgAC}/>
        </div>
    );
}

export default Dialogs