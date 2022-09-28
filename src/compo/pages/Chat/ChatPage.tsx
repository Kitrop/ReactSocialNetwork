import {useEffect} from 'react'
import MessageForm from './MessageForm'
import Messages from './Messages/Messages'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/redux-store'
import {ActionsType, startMessagesListening, stopMessagesListening} from '../../../redux/reducers/chatReducer'
import {getMessagesSelector, getStatusSelector} from '../../../redux/selectors/chatSelector'
import {useNavigate} from 'react-router-dom'
import {getAuthIdSelector} from '../../../redux/selectors/authSelector'


const ChatPage = () => {

    //State
    const messages = useSelector((state: AppStateType) => getMessagesSelector(state))
    const isAuth = useSelector( (state: AppStateType) => getAuthIdSelector(state))
    const status = useSelector((state: AppStateType) => getStatusSelector(state))

    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening()).then(r => r)
        return () => {
            dispatch(stopMessagesListening()).then(r => r)
        }
    }, [dispatch])

    // if user not login redirect to /login
    let navigator = useNavigate()
    useEffect(() => {
        if ( !isAuth ) {
            return navigator('/login')
        }
    }, [isAuth, navigator]);

    return (
        <div>
            {/*{status === 'error' ? <div>ERROR. Please refresh page</div> : null}*/}
            <Messages messages={messages}/>
            <MessageForm status={status}/>
        </div>
    )
}

export default ChatPage

