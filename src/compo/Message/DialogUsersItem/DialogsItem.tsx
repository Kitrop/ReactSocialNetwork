import style from './DialogsItem.module.css';
import {NavLink} from 'react-router-dom';
import { FC } from 'react';

type Props = {
    id: number
    name: string
}

const DialogUsersItem: FC<Props> = ({id, name}) =>  {
    let path = "/dialogs/" + id;
    return (
        <div className={style.dialogs_item}>
            <NavLink className={style.userName} to={path}>  {name} </NavLink>
        </div>
    );
}

export default DialogUsersItem;