import {LoginForm} from './LoginForm'
import {loginThunk} from '../../redux/reducers/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {getCaptcha, getIsAuth} from '../../redux/selectors/authSelector'
import {AppStateType} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";

const Login = () => {

    // STATE
    const captchaUrl_ = useSelector((state: AppStateType) => getCaptcha(state))
    const isAuth_ = useSelector((state: AppStateType)=> getIsAuth(state))

    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, any, any> = useDispatch()
    const loginThunk_ =  (email: string, password: number, rememberMe: boolean, captcha: any) => dispatch(loginThunk(email, password, rememberMe, captcha))


    let navigator = useNavigate()
    useEffect(() => {
        if (isAuth_) {
            navigator('/users')
        }
    }, [navigator, isAuth_])

    return (
        <div>
            <h1>Login</h1>
            <LoginForm loginThunk={loginThunk_} captchaUrl={captchaUrl_} />
        </div>
    )
}

export default Login