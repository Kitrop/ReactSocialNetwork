import {FC, memo} from 'react'
import avatar from '../../../../img/avatar.jpg'
import {ChatMessageAPI} from '../../../../redux/types/type'
import {NavLink} from 'react-router-dom'
import style from '../chat.module.css'

interface Props {
    message: ChatMessageAPI
}

const Message:FC<Props> = memo(({message}) => {



    return (
        <div className={style.chatElement}>
            <div>
                <NavLink to={'/profile/' + message.userId} ><img src={message.photo ? message.photo : avatar}  alt={'avatar'} style={{ width: 70, height: 70, borderRadius: '50%', verticalAlign: 'top'}}/></NavLink>
                <span> {message.userName} </span>
            </div>
            <div className={style.chatElement}> {message.message} </div>
            <hr/>
        </div>
    )
})

export default Message