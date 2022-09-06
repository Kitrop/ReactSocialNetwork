import {LoginForm} from './LoginForm'
import {ActionsType, loginThunk} from '../../redux/reducers/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {getCaptchaSelector, getIsAuthSelector} from '../../redux/selectors/authSelector'
import {AppStateType} from '../../redux/redux-store'
import {ThunkDispatch} from 'redux-thunk'

const Login = () => {

    // STATE
    const captchaUrl_ = useSelector((state: AppStateType) => getCaptchaSelector(state))
    const isAuth_ = useSelector((state: AppStateType)=> getIsAuthSelector(state))


    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()
    const loginThunk_ =  (email: string, password: number, rememberMe: boolean, captcha: string | null) => dispatch(loginThunk(email, password, rememberMe, captcha))


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