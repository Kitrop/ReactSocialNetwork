import d from './DialogsItem.module.css';
import {NavLink} from 'react-router-dom';


function DialogItem(props) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={d.dialogs_item}>
            <NavLink to={path}>  {props.name} </NavLink>
        </div>
    );
}

export default DialogItem;