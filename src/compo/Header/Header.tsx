import style from './Header.module.css'
import {NavLink} from 'react-router-dom'
import logout from '../../icon/logout_black_24dp.svg'
import logo from '../../img/logo.png'
import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getIsAuth, getIsAuthSelector, getLogin, getLoginSelector} from '../../redux/selectors/authSelector'
import {ThunkDispatch} from "redux-thunk";
import {loginMeThunk, logoutThunk} from "../../redux/reducers/authReducer";


const Header = () => {


    // STATE
    const isAuth_ = useSelector((state: AppStateType) =>  getIsAuthSelector(state))
    const login_ = useSelector((state: AppStateType)  => getLoginSelector(state))

    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, any, any> = useDispatch()
    const loginThunk_ = () => dispatch(loginMeThunk())
    const logoutThunk_ = () => dispatch(logoutThunk())

    useEffect( () => {
        loginThunk_()
    }, [loginThunk_, isAuth_]);


    return <header className={style.header}>
            <img src={logo} alt={'logo'} className={style.logo}/>
            <div className={style.login_btn}>
                { isAuth_
                    ? <div> {login_} - <button onClick={logoutThunk_} className={style.logout_btn}> <img className={style.logout_icon} src={logout} alt={'logout'}/> </button></div>
                    : <NavLink to={'/Login'}> Login </NavLink> }
            </div>
        </header>
}


export default Header;