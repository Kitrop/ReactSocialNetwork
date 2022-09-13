import {UsersInterface} from '../types/type'
import {AppStateType, InferActionsTypes} from '../redux-store'
import {ThunkDispatch} from 'redux-thunk'
import {userActions} from './usersReducer'
import {userApi} from '../../compo/api/usersApi'


// Initial State
type InitialStateType = {
    friends: UsersInterface[]
}
const initialState = {
    friends: []
}


// Reducer
const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_FRIEND': {
            return {...state, friends: [...action.friends]}
        }
        default: return state
    }
}

type ActionsType = InferActionsTypes<typeof sidebarActions>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>


// actionCreator
export const sidebarActions = {
    setFriends: (friends: UsersInterface[]) => ({type: 'SET_FRIEND', friends} as const)
}


// thunkCreator
export const getFriends = () => async (dispatch: DispatchThunkType) => {
    // @ts-ignore
    dispatch(sidebarActions.setFriends())
}




export default  sidebarReducer