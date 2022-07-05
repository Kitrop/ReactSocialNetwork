import head from './Header.module.css'
import {NavLink} from 'react-router-dom'
const Header = (props) => {
    return <header className={head.header}>
            {/*<img className={head.logo} src={logo} alt={"logo"}/>*/}
            <div className={head.login_btn}>
                { props.isAuth
                    ? <div> {props.login} - <button onClick={props.logoutThunk}>logout</button></div>
                    : <NavLink to={'/Login'}> Login </NavLink> }
            </div>
        </header>
}

export default Header;