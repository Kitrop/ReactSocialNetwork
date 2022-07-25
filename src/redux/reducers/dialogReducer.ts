const SEND_MESSAGE: string = 'SEND_MESSAGE'

interface DialogsData {
    id: number,
    name: string
}
interface MessagesData {
    id: number,
    message: string
}

interface Initial {
    UsersDialogData: DialogsData[]
    messagesData: MessagesData[]
    newMessageText: string
}



const initialState: Initial = {
    UsersDialogData: [
        { id: 1, name: "Dimych"},
        { id: 2, name: "Evgeniy"},
        { id: 3, name: "Sasha" },
    ],
    messagesData: [
        {
            id: 1, message: 'Hello'
        }, {
            id: 2, message: 'How are you?'
        }, {
            id: 3, message: 'Chel'
        }, {
            id: 4, message: 'REACT REACT AND REDUX'
        }],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE: {
            let body: string = action.newMessageText
            return {
                ...state,
                messagesData: [...state.messagesData, {message: body}]
            }
        }
        default: {
            return state
        }
    }
}

export const SendMessageActionCreater = (newMessageText: string) => ({type: SEND_MESSAGE, newMessageText})