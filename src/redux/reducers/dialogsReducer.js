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
        case SEND_MESSAGE: {
            let body = action.newMessageText
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}],
                newMessageText: ''
            }
        }
        default:
            return state
    }
}

export const SendMessageActionCreater = (newMessageText) => ({type: SEND_MESSAGE, newMessageText})

export default dialogsReducer;