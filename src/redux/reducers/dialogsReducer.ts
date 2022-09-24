import {InferActionsTypes} from "../redux-store";


// State
let initialState = {
    usersDialogData: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Evgeniy" },
        { id: 3, name: "Sasha"},
    ] as Array<DialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How are you?'},
        { id: 3, message: 'Chel'},
        { id: 4, message: 'REACT REACT AND REDUX'}
    ] as Array<MessagesDataType>,
    newMessageText: ''
};
export type initialStateType = typeof initialState


// Reducer
const dialogsReducer = (state = initialState, action: ActionsType):initialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE': {
            let body: string = action.newMessageText
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 10, message: body}],
                newMessageText: ''
            }
        }
        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof dialogsActions>


// actionCreator
export const dialogsActions = {
    SendMessageActionCreater: (newMessageText: string) => ({type: 'SEND_MESSAGE', newMessageText} as const)
}


export default dialogsReducer;



//types
type DialogsDataType = {
    id: number,
    name: string,
}
type MessagesDataType = {
    id: number,
    message: string
}