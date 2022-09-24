import {FC, useState} from 'react'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/redux-store'
import {ActionsType, chatAction, sendMessage} from '../../../redux/reducers/chatReducer'
import {useDispatch} from 'react-redux'

interface Props {
    status: string
}

const MessageForm: FC<Props> = ({status}) => {

    // Dispatch
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()

    const [message, setMessage] = useState('')



    const sendMessageHandler = () => {
        if (!message && message.trim().length !== 0) {
            return;
        } else {
            chatAction.setStatus('pending')
            dispatch(sendMessage(message))
            chatAction.setStatus('ready')
            setMessage('')
        }
    }

    return (
        <>
            <div>
                <textarea onChange={(e: any) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </>
    )
}

export default MessageForm