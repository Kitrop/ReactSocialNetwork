// import {SendMessageActionCreater, UpdateNewMessageActionCreater} from "../../redux/dialogsReducer";
// import Dialogs from "./Dialogs";
// import {connect, useDispatch, useSelector} from "react-redux";
// import {getIsAuth, getMessage} from "../../redux/dialogSelectors";
// import {useNavigate} from "react-router-dom";
// import {useEffect} from "react";
//
//
//
//
// // const DialogsContainer = (props) => {
// //     const selectDialogState = createSelector(
// //         (state) => state.dialogsPage,
// //         (state) => state.auth.isAuth
// //     )
// //     const selectorsDialog = useSelector(selectDialogState)
// //     const dispatch = useDispatch()
// //     return (
// //         RedirectToAuth(Dialogs)
// //     )
// // }
//
//
// const DialogsContainer = (props) => {
//     let navigator = useNavigate()
//     useEffect(() => {
//         if (props.isAuth === false) {
//             return navigator('/login')
//         }
//     }, [navigator, props.isAuth]);
//
//     const dialogsPage = useSelector( state => getMessage(state))
//     const isAuth = useSelector( state => getIsAuth(state))
//     const dispatch = useDispatch()
//
//     return (
//         <Dialogs SendMessageActionCreater={dispatch(SendMessageActionCreater)}
//                  UpdateNewMessageActionCreater={dispatch(UpdateNewMessageActionCreater)}
//                  dialogsPage={dialogsPage}
//                  isAuth={isAuth}/>
//     )
// }
//
//
//
//
//
// // const mapStateToProps = (state) => {
// //     return {
// //         dialogsPage: getMessage(state),
// //         isAuth: state.auth.isAuth
// //     }
// // }
//
// // connect(mapStateToProps, {SendMessageActionCreater, UpdateNewMessageActionCreater})(DialogsContainer);
//
// export default DialogsContainer;
