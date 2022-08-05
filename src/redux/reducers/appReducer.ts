import {loginMeThunk} from "./authReducer";
import {Dispatch} from 'redux';

// Name action
const SET_INITIALIZED = 'SET_INITIALIZED'

interface InitialStateInterface {
    initialized: boolean
}

// Reducer
const initialState: InitialStateInterface = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateInterface => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

interface initializingACInterface {
    type: typeof SET_INITIALIZED
}


// actionCreator
const initializingAC = ():initializingACInterface => ({type:SET_INITIALIZED})

// thunkCreator
export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(loginMeThunk())
    await Promise.all([promise])
    dispatch(initializingAC())
}

export default appReducer