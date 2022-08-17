import {NavLink} from 'react-router-dom';
import style from './notFound.module.css'

const NotFound = () => {
    return (
        <div>
            <div className={style.hitTheFloor}> 404 NOT FOUND </div>
            <div className={style.textUnderNotFound}> Если вы сюда попали попробуйте <NavLink to="/login">зарегистрироваться</NavLink> или перейдите на <NavLink to={'/profile'}>главную страницу</NavLink> </div>
        </div>
    )
}

export default NotFound