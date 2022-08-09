import message from './Dialogs.module.css';
import DialogUsersItem from './DialogUsersItem/DialogsItem';
import Message from "./MessagesItem/Message";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getMessage} from "../../redux/selectors/dialogSelectors";
import DialogsForm from "./DialogsForm";
import {useNavigate} from "react-router-dom";
import {SendMessageActionCreater} from '../../redux/reducers/dialogsReducer'
import {AppStateType} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import App from "../../App";

function Dialogs() {

    // STATE
    const dialogsPage = useSelector( (state: AppStateType) => getMessage(state))
    const isAuth = useSelector( (state: AppStateType) => getIsAuth(state))

    // if user not login redirect to /login
    let navigator = useNavigate()
    useEffect(() => {
        if ( !isAuth ) {
            return navigator('/login')
        }
    }, [isAuth, navigator]);


    let dialogsElements = dialogsPage.usersDialogData.map(d => <DialogUsersItem name={d.name} key={d.id} id={d.id} />)
    let messagesElements = dialogsPage.messagesData.map(m => <Message key={m.id}  messageContent={m.message}/>)



    const dispatch: ThunkDispatch<AppStateType, any, any> = useDispatch()
    const sendMsgAC = (newMessageText: string) => {dispatch(SendMessageActionCreater(newMessageText))}

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