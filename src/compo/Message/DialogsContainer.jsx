import {SendMessageActionCreater, UpdateNewMessageActionCreater} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const RedirectComponent = (props) => {
    if (props.isAuth === false) {
        return <Navigate to={'/login'} />
    }
    return <Dialogs {...props} />
}

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const DialogsContainer = connect(mapStateToProps, {SendMessageActionCreater, UpdateNewMessageActionCreater})(RedirectComponent);

export default DialogsContainer;
