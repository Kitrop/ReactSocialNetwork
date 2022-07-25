import style from './DialogsItem.module.css';
import {NavLink} from 'react-router-dom';


const DialogUsersItem = (props) =>  {
    let path = "/dialogs/" + props.id;
    return (
        <div className={style.dialogs_item}>
            <NavLink className={style.userName} to={path}>  {props.name} </NavLink>
        </div>
    );
}

export default DialogUsersItem;