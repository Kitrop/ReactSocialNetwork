const SEND_MESSAGE = 'SEND_MESSAGE';


type DialogsDataType = {
    id: number,
    name: string,
}
type MessagesDataType = {
    id: number,
    message: string
}
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

const dialogsReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
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



// actionCreator
interface SendMessageInterface {
    type: typeof SEND_MESSAGE
    newMessageText: string
}
export const SendMessageActionCreater = (newMessageText: string): SendMessageInterface => ({type: SEND_MESSAGE, newMessageText})


export default dialogsReducer;