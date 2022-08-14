import {loginMeThunk} from "./authReducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";

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

type ActionsType = InferActionsTypes<typeof appAction>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>


// actionCreator
export const appAction = {
    initializingAC:() => ({type:SET_INITIALIZED} as const)
}


// thunkCreator
export const initializeApp = () => async (dispatch: DispatchThunkType) => {
    let promise = dispatch(loginMeThunk())
    await Promise.all([promise])
    dispatch(appAction.initializingAC())
}


export default appReducer