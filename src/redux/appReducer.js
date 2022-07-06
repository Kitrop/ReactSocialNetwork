import {loginMeThunk} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED'

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


// actionCreator
const initializingAC = () => ({type:SET_INITIALIZED})

// thunkCreator

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(loginMeThunk());
    Promise.all([promise])
        .then(() => {
            dispatch(initializingAC());
        });
}

export default appReducer