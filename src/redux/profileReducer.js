// actions
const ADD_POST  = 'ADD-POST';
const NEW_TEXT_UPDATE  = 'NEW-TEXT-UPDATE';

// state
let initialState = {
    postsData: [
        {name: 'Evgeniy', text: 'I need more React', like: '16'},
        {text: 'I love REACT!!!', like: '45'},
    ],
    newPostText: 'it-sphere'
};

//reducer
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
            name: 'Oleg',
            text: state.newPostText,
            like: '56',
        };

            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        }
        case NEW_TEXT_UPDATE: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        default: {
            return state
        }
    }
}
// actionCreater
export const addPostActionCreater = () =>({type: ADD_POST})
export const updPostActionCreater = (textPost) => ({type: NEW_TEXT_UPDATE, newText: textPost})



export default profileReducer;