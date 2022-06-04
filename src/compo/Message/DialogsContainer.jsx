import {SendMessageActionCreater, UpdateNewMessageActionCreater} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
/*const mapDispatchToProps = (dispatch) => {
    return {
        OnNewMessageSend: (body) => {
            dispatch(UpdateNewMessageActionCreater(body))
        },
        sendMessage: () => {
            dispatch(SendMessageActionCreater())
        }
    }
}*/

const DialogsContainer = connect(mapStateToProps, {SendMessageActionCreater, UpdateNewMessageActionCreater})(Dialogs);

export default DialogsContainer;
