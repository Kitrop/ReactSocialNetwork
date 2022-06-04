const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogsData: [
        {id: 1, name: "Dimych",},
        {
            id: 2,
            name: "Evgeniy",
        },
        {
            id: 3,
            name: "Sasha",
        },
    ],
    messagesData: [
        {
            id: 1,
            message: "Hello",
        }, {
            id: 2,
            message: "How are you?",
        }, {
            id: 3,
            message: "Chel",
        }, {
            id: 4,
            message: "REACT REACT AND REDUX",
        },],
    newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.body,
            }
        }
        case SEND_MESSAGE: {
            let body = {
                id: '5', message: state.newMessageText,
            }
            return {
                ...state,
                messagesData: [...state.messagesData, body],
                newMessageText: ''
            }
        }
        default:
            return state
    }
}


export const SendMessageActionCreater = () => ({type: SEND_MESSAGE,})
export const UpdateNewMessageActionCreater = (body) => ({type: UPDATE_NEW_MESSAGE_TEXT, body: body})

export default dialogsReducer;