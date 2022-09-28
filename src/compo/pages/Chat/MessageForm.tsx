import {FC, useState} from 'react'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/redux-store'
import {ActionsType, chatAction, sendMessage} from '../../../redux/reducers/chatReducer'
import {useDispatch} from 'react-redux'
import {Button, TextField} from '@mui/material'
import style from './chat.module.css'




const MessageForm: FC<Props> = ({status}) => {

    // Dispatch
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()
    const [message, setMessage] = useState('')


    const sendMessageHandler = () => {
        if (!message && message.trim().length !== 0) {
            return
        } else {
            chatAction.setStatus('pending')
            dispatch(sendMessage(message))
            chatAction.setStatus('ready')
            setMessage('')
        }
    }


    const keyPressStatus = (event: any) => {
        if (event.key === 'Enter') {
            sendMessageHandler()
        }
    }


    return (
        <>
            <div className={style.chatElement}>
                <TextField onKeyPress={keyPressStatus} onChange={(e: any) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div className={style.chatElement}>
                <Button variant="contained" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </>
    )
}

export default MessageForm



// types
interface Props {
    status: string
}