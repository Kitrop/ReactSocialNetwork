import {useDispatch, useSelector} from 'react-redux'
import Header from './Header'
import {useEffect} from 'react'
import {loginMeThunk, logoutThunk} from '../../redux/reducers/authReducer'
import {getIsAuth, getLogin} from '../../redux/selectors/authSelector'


const HeaderContainer = (props) => {

    // STATE
    const isAuth_ = useSelector(state =>  getIsAuth(state))
    const login_ = useSelector(state => getLogin(state))

    // DISPATCH
    const dispatch = useDispatch()
    const loginThunk_ = () => dispatch(loginMeThunk())
    const logoutThunk_ = () => dispatch(logoutThunk())

    useEffect( () => {
        loginThunk_()
    }, [loginThunk_, isAuth_]);

    return <Header  isAuth={isAuth_} login={login_} logoutThunk={logoutThunk_}/>
}


export default HeaderContainer;