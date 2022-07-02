import {SendMessageActionCreater, UpdateNewMessageActionCreater} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {getMessage} from "../../redux/dialogSelectors";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";




// const DialogsContainer = (props) => {
//     const selectDialogState = createSelector(
//         (state) => state.dialogsPage,
//         (state) => state.auth.isAuth
//     )
//     const selectorsDialog = useSelector(selectDialogState)
//     const dispatch = useDispatch()
//     return (
//         RedirectToAuth(Dialogs)
//     )
// }


const DialogsContainer = (props) => {
    let navigator = useNavigate()
    useEffect(() => {
        if (props.isAuth === false) {
            return navigator('/login')
        }
    }, [navigator, props.isAuth]);

    return (
        <Dialogs SendMessageActionCreater={props.SendMessageActionCreater}
                 UpdateNewMessageActionCreater={props.UpdateNewMessageActionCreater}
                 dialogsPage={props.dialogsPage}
                 isAuth={props.isAuth}/>
    )

}





const mapStateToProps = (state) => {
    return {
        dialogsPage: getMessage(state),
        isAuth: state.auth.isAuth
    }
}

connect(mapStateToProps, {SendMessageActionCreater, UpdateNewMessageActionCreater})(DialogsContainer);

export default DialogsContainer;
