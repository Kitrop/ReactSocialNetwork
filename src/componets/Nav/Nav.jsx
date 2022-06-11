import navbar from './Nav.module.css';
import {NavLink} from 'react-router-dom';
import FriendContainer from "./Friends/FriendContainer";

const Nav = (props) => {

    return (
        <nav className={navbar.sidebar}>
            <div> <NavLink to="/profile">Profile</NavLink> </div>
            <div> <NavLink to="/dialogs">Dialogs</NavLink> </div>
            <div> <NavLink to="/users">Find user</NavLink> </div>
            <div> <NavLink to="/">Post</NavLink> </div>
            <div> <NavLink className={navbar.sidebar_setting} to="#" >Setting</NavLink> </div>
            <div> <NavLink to="/">Friends</NavLink> </div>

            <FriendContainer />

        </nav>
    );
}

export default Nav;