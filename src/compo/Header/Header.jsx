import style from './Header.module.css'
import {NavLink} from 'react-router-dom'
import logout from '../../icon/logout_black_24dp.svg'
import logo from '../../img/logo.png'
const Header = ({isAuth, login, logoutThunk}) => {
    return <header className={style.header}>
            <img src={logo} alt={'logo'} className={style.logo}/>
            <div className={style.login_btn}>
                { isAuth
                    ? <div> {login} - <button onClick={logoutThunk} className={style.logout_btn}> <img className={style.logout_icon} src={logout} alt={'logout'}/> </button></div>
                    : <NavLink to={'/Login'}> Login </NavLink> }
            </div>
        </header>
}

export default Header;