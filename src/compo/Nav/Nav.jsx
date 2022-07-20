import navbar from './Nav.module.css'
import {NavLink} from 'react-router-dom'
import Friend from './Friends/Friend'

const Nav = (props) => {

    return (
        <nav className={navbar.sidebar}>
            <div> <NavLink to="/profile/24394">Profile</NavLink> </div>
            <div> <NavLink to="/dialogs">Dialogs</NavLink> </div>
            <div> <NavLink to="/users">Find user</NavLink> </div>
            <Friend/>
        </nav>
    );
}

export default Nav;