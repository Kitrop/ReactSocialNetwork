import head from './Header.module.css'
import {NavLink} from 'react-router-dom'
const Header = (props) => {
    return <header className={head.header}>
            {/*<img className={head.logo} src={logo} alt={"logo"}/>*/}
            <div className={head.login_btn}>
                { props.isAuth ? props.login
                : <NavLink to={'/login'}> Login </NavLink> }
            </div>
        </header>
}

export default Header;