import style from './Nav.module.css'
import friends from '../../icon/people_white_24dp.svg'
import profile from '../../icon/person_white_24dp.svg'
import dialogs from '../../icon/send_white_24dp.svg'
import {NavLink} from 'react-router-dom'

const Nav = (props) => {

    return (
        <nav className={style.sidebar}>
            <div className={style.link}> <NavLink to="/profile/24394"> <img src={profile} alt={'icon'}/> Profile</NavLink> </div>
            <div className={style.link}> <NavLink to="/dialogs"> <img src={dialogs} alt={'icon'}/> Dialogs</NavLink> </div>
            <div className={style.link}> <NavLink to="/users"> <img src={friends} alt={'icon'}/> Find user</NavLink> </div>
        </nav>
    );
}

export default Nav;