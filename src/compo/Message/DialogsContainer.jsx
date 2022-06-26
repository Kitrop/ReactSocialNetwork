import {SendMessageActionCreater, UpdateNewMessageActionCreater} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RedirectToAuth} from "../hoc/RedirectToAuth";


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const DialogsContainer = connect(mapStateToProps, {SendMessageActionCreater, UpdateNewMessageActionCreater})(RedirectToAuth(Dialogs));

export default DialogsContainer;
