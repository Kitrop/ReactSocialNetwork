import {LoginForm} from "./LoginForm";
import {loginThunk, logoutThunk} from "../../redux/authReducer";
import {isAuth} from "../../redux/usersSelector";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Login = (props) => {

    let navigator = useNavigate()
    useEffect(() => {
        if (props.isAuth === true) {
            navigator('/users')
        }
    }, [navigator, props.isAuth])

    return (
        <div>
            <h1>Login</h1>
            <LoginForm loginThunk={props.loginThunk} logoutThunk={props.logoutThunk}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: isAuth(state)
    }
}

export default connect(mapStateToProps, {loginThunk})(Login)