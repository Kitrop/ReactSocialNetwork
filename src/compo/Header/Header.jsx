import head from './Header.module.css'
import {NavLink} from 'react-router-dom'
const Header = ({isAuth, login, logoutThunk}) => {
    return <header className={head.header}>
            <div className={head.login_btn}>
                { isAuth
                    ? <div> {login} - <button onClick={logoutThunk}>logout</button></div>
                    : <NavLink to={'/Login'}> Login </NavLink> }
            </div>
        </header>
}

export default Header;