import {loginMeThunk} from "./authReducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";


// State
const initialState = {
    initialized: false
}
type InitialState = typeof initialState


// Reducer
const appReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

export type ActionsType = InferActionsTypes<typeof appAction>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>


// actionCreator
export const appAction = {
    initializingAC:() => ({type:'SET_INITIALIZED'} as const)
}


// thunkCreator
export const initializeApp = () => async (dispatch: DispatchThunkType) => {
    let promise = dispatch(loginMeThunk())
    await Promise.all([promise])
    dispatch(appAction.initializingAC())
}


export default appReducer