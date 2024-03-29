import {ResultCodesEnum} from '../../api/api'
import {updateObj} from '../../utility/updateObjectArray'
import {UsersInterface} from '../types/type'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType, InferActionsTypes} from '../redux-store'
import {userApi} from '../../api/usersApi'

const initialState: InitialStateInterface = {
    users: [],
    pageSize: 10,
    portionSize: 5,
    ifFetching: true,
    totalUsersCount: 0,
    currentPage: 1,
    filter: {
        term: '',
        friend: null
    },
    isFollowing: []
}

// Reducer
const usersReducer = (state = initialState, action: ActionsType): InitialStateInterface => {
    switch (action.type) {
        case 'FOLLOW_USER':
            return {
                ...state,
                users: updateObj(state.users, action.userId, 'id', {followed: true})
            }
        case 'UNFOLLOW_USER':
            return {
                ...state,
                users: updateObj(state.users, action.userId, 'id', {followed: false})
            }
        case 'SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'SWITCH_IS_FETCHING': {
            return {...state, ifFetching: action.ifFetching}
        }
        case 'SWITCH_IS_FOLLOWING': {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return <InitialStateInterface>{
                ...state,
                isFollowing: action.ifFetching
                    ? [...state.isFollowing, action.userId]
                    // @ts-ignore
                    // eslint-disable-next-line eqeqeq
                    : state.isFollowing.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}


// actionCreator
export const userActions = {
    follow: (userId: number) => ({type: 'FOLLOW_USER', userId} as const),
    unfollow: (userId: number) => ({type: 'UNFOLLOW_USER', userId} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    switchIsFollowing: (ifFetching: boolean, userId: number) => ({type: 'SWITCH_IS_FOLLOWING', ifFetching, userId} as const),
    setUsers: (users: UsersInterface[]) => ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    switchIsFetching: (ifFetching: boolean) => ({type: 'SWITCH_IS_FETCHING', ifFetching} as const),
}


// thunkCreator
export const getUserThunk = (currentPage: number, filter: FilterType) => async (dispatch: DispatchThunkType) => {
    dispatch(userActions.switchIsFetching(true))
    let data = await userApi.getUserApi(currentPage, filter.term, filter.friend)
    dispatch(userActions.switchIsFetching(false))
    dispatch(userActions.setUsers(data.items))
    dispatch(userActions.setFilter(filter))
    dispatch(userActions.setTotalUsersCount(data.totalCount))
    dispatch(userActions.setCurrentPage(currentPage))
}
export const unfollowThunk = (id: number) => async (dispatch: DispatchThunkType) => {
    await followUnfollowFlowThunk(dispatch, id, userApi.deleteUserApi.bind(userApi), userActions.unfollow)
}
export const followThunk = (id: number) => async (dispatch: DispatchThunkType) => {
    await followUnfollowFlowThunk(dispatch, id, userApi.postUserApi.bind(userApi), userActions.follow)
}
const followUnfollowFlowThunk = async (dispatch: DispatchThunkType, id: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(userActions.switchIsFollowing(true, id))
    let data = await apiMethod(id)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(id))
    }
    dispatch(userActions.switchIsFollowing(false, id))
}


export default usersReducer;




// Types
export type ActionsType = InferActionsTypes<typeof userActions>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>
export type FilterType = typeof initialState.filter

export interface InitialStateInterface {
    users: UsersInterface[]
    pageSize: number
    portionSize: number
    ifFetching: boolean
    totalUsersCount: number
    currentPage: number
    filter: {
        term: string,
        friend: boolean | null
    }
    isFollowing: number[]
}