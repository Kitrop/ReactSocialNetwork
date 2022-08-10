import {loginMeThunk} from "./authReducer";
import {Dispatch} from 'redux';
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux-store";

// Name action
const SET_INITIALIZED = 'SET_INITIALIZED'

// State
const initialState: InitialStateInterface = {
    initialized: false
}
interface InitialStateInterface {
    initialized: boolean
}

// Reducer
const appReducer = (state = initialState, action: ActionsType): InitialStateInterface => {
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

interface InitializingACInterface {
    type: typeof SET_INITIALIZED
}

type ActionsType = InitializingACInterface
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>

// actionCreator
const initializingAC = ():InitializingACInterface => ({type:SET_INITIALIZED})

// thunkCreator
export const initializeApp = () => async (dispatch: DispatchThunkType) => {
    let promise = dispatch(loginMeThunk())
    await Promise.all([promise])
    dispatch(initializingAC())
}

export default appReducer