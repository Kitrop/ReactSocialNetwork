import {connect} from "react-redux";
import Header from "./Header";
import {useEffect} from "react";
import {loginMeThunk, logoutThunk, setAuthUserData} from "../../redux/reducers/authReducer";
import {getIsAuth, getLogin} from "../../redux/selectors/authSelector";


const HeaderContainer = (props) => {
    useEffect( () => {
        props.loginThunk()
    }, [props]);

    return <Header {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    login: getLogin(state)
});

export default connect(mapStateToProps, {loginThunk: loginMeThunk, logoutThunk})(HeaderContainer);