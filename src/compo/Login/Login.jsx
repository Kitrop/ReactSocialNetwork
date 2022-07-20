import {LoginForm} from './LoginForm'
import {loginThunk} from '../../redux/reducers/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {getCaptcha, getIsAuth} from '../../redux/selectors/authSelector'

const Login = (props) => {

    // STATE
    const captchaUrl_ = useSelector(state => getCaptcha(state))
    const isAuth_ = useSelector(state => getIsAuth(state))

    // DISPATCH
    const dispatch = useDispatch()
    const loginThunk_ =  (email, password, rememberMe, captcha) => dispatch(loginThunk(email, password, rememberMe, captcha))


    let navigator = useNavigate()
    useEffect(() => {
        if (isAuth_ === true) {
            navigator('/users')
        }
    }, [navigator, isAuth_])

    return (
        <div>
            <h1>Login</h1>
            <LoginForm loginThunk={loginThunk_} logoutThunk={props.logoutThunk} captchaUrl={captchaUrl_}/>
        </div>
    )
}

export default Login