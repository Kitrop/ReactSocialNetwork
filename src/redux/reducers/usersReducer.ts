import {userApi} from '../../compo/api/api'
import {updateObj} from '../../utility/updateObjectArray'
import {UsersInterface} from "../types/type";
import {InferThunkActionCreatorType} from "react-redux";
import { AnyAction } from 'redux';
import {ThunkDispatch} from "redux-thunk";
// name action
const FOLLOW_USER = 'follow/FOLLOW_USER'
const UNFOLLOW_USER = 'unfollow/UNFOLLOW_USER'
const SET_USERS = 'setUsers/SET_USERS'
const SET_CURRENT_PAGE = 'setCurrentPage/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'setTotalUsersCount/SET_TOTAL_USERS_COUNT'
const SWITCH_IS_FETCHING = 'switchIsFetching/SWITCH_IS_FETCHING'
const SWITCH_IS_FOLLOWING = 'switchIsFollowing/SWITCH_IS_FOLLOWING'

// state
interface InitialStateInterface {
    users: UsersInterface[]
    pageSize: number
    portionSize: number
    ifFetching: boolean
    totalUsersCount: number
    currentPage: number
    isFollowing: boolean[]
}

let initialState: InitialStateInterface = {
    users: [],
    pageSize: 5,
    portionSize: 15,
    ifFetching: true,
    totalUsersCount: 0,
    currentPage: 1,
    isFollowing: []
}

//reducer
const usersReducer = (state = initialState, action: any): InitialStateInterface => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: updateObj(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: updateObj(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case SWITCH_IS_FETCHING: {
            return {...state, ifFetching: action.ifFetching}
        }
        case SWITCH_IS_FOLLOWING: {
            return {
                ...state,
                isFollowing: action.ifFetching
                    ? [...state.isFollowing, action.userId]
                    : state.isFollowing.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

// interfaces for AC
interface Follow {
    type: typeof FOLLOW_USER
    userId: number
}
interface UnFollow {
    type: typeof UNFOLLOW_USER
    userId: number
}
interface SetCurrentPage {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
interface SwitchIsFollowing {
    type: typeof SWITCH_IS_FOLLOWING
    ifFetching: boolean
    userId: number
}
interface SetUsers {
    type: typeof SET_USERS
    users: UsersInterface[]
}
interface SetTotalUsersCount {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
interface SwitchIsFetching {
    type: typeof SWITCH_IS_FETCHING
    ifFetching: boolean
}



// actionCreator
export const follow = (userId: number):Follow => ({type: FOLLOW_USER, userId})
export const unfollow = (userId: number):UnFollow => ({type: UNFOLLOW_USER, userId})
export const setCurrentPage = (currentPage: number):SetCurrentPage => ({type: SET_CURRENT_PAGE, currentPage})
export const switchIsFollowing = (ifFetching: boolean, userId: number):SwitchIsFollowing => ({type: SWITCH_IS_FOLLOWING, ifFetching, userId})
export const setUsers = (users: UsersInterface[]):SetUsers => ({type: SET_USERS, users})
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCount => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const switchIsFetching = (ifFetching: boolean):SwitchIsFetching => ({type: SWITCH_IS_FETCHING, ifFetching})


// thunkCreator
export const getUserThunk = (currentPage: number) => async (dispatch: any) => {
    const apiMethod = userApi.getUserApi.bind(userApi)
    dispatch(switchIsFetching(true))
    let data = await apiMethod(currentPage)
    dispatch(switchIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}
export const unfollowThunk = (id: number) => async (dispatch: any)=> {
    await followUnfollowFlowThunk(dispatch, id, userApi.deleteUserApi.bind(userApi), unfollow)
}
export const followThunk = (id: number) => async (dispatch: any) => {
    await followUnfollowFlowThunk(dispatch, id, userApi.postUserApi.bind(userApi), follow)
}
const followUnfollowFlowThunk = async (dispatch: any, id: number, apiMethod: any, actionCreator:any) => {
    dispatch(switchIsFollowing(true, id))
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(switchIsFollowing(false, id))
}


export default usersReducer