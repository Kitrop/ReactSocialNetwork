import {connect} from "react-redux";
import Header from "./Header";
import {useEffect} from "react";
import axios from "axios";
import {setAuthUserData} from "../../redux/authReducer";
import {getLoginApi} from "../api/api";

const HeaderContainer = (props) => {
    useEffect( () => {
        getLoginApi()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    props.setAuthUserData(id , email, login);
                }
            });
    }, []);

    return <Header {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);