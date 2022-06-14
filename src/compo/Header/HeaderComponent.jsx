import {connect} from "react-redux";
import Header from "./Header";
import {useEffect} from "react";
import axios from "axios";
import {loginThunk, setAuthUserData} from "../../redux/authReducer";
import {getLoginApi} from "../api/api";

const HeaderContainer = (props) => {
    useEffect( () => {
        props.loginThunk()
    }, []);

    return <Header {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData, loginThunk})(HeaderContainer);