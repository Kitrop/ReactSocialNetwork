// actions
import {userApi} from '../../compo/api/api'

// name action
const FOLLOW_USER = 'follow/FOLLOW_USER'
const UNFOLLOW_USER = 'unfollow/UNFOLLOW_USER'
const SET_USERS = 'setUsers/SET_USERS'
const SET_CURRENT_PAGE = 'setCurrentPage/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'setTotalUsersCount/SET_TOTAL_USERS_COUNT'
const SWITCH_IS_FETCHING = 'switchIsFetching/SWITCH_IS_FETCHING'
const SWITCH_IS_FOLLOWING = 'switchIsFollowing/SWITCH_IS_FOLLOWING'

// state
let initialState = {
    users: [],
    pageSize: 5,
    ifFetching: true,
    totalUsersCount: 0,
    currentPage: 1,
    isFollowing: []
}

//
const updateObj = (items, itemId, objName, newPropsObj) => {
    return items.map(u => {
        if (u[objName] === itemId) {
            return {...u, ...newPropsObj}
        }
        return u
    })
}

//reducer
const usersReducer = (state = initialState, action) => {
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

// actionCreator
export const follow = (userId) => ({type: FOLLOW_USER, userId})
export const unfollow = (userId) => ({type: UNFOLLOW_USER, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const switchIsFetching = (ifFetching) => ({type: SWITCH_IS_FETCHING, ifFetching})
export const switchIsFollowing = (ifFetching, userId) => ({type: SWITCH_IS_FOLLOWING, ifFetching, userId})

// thunkCreator
export const getUserThunk = (currentPage, pageSize) => async (dispatch) => {
    const apiMethod = userApi.getUserApi.bind(userApi)
    dispatch(switchIsFetching(true))
    let data = await apiMethod(currentPage, pageSize)
    dispatch(switchIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}
export const unfollowThunk = (id) => async (dispatch) => {
    await followUnfollowFlowThunk(dispatch, id, userApi.deleteUserApi.bind(userApi), unfollow)
}
export const followThunk = (id) => async (dispatch) => {
    await followUnfollowFlowThunk(dispatch, id, userApi.postUserApi.bind(userApi), follow)
}
const followUnfollowFlowThunk = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(switchIsFollowing(true, id))
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(switchIsFollowing(false, id))
}


export default usersReducer