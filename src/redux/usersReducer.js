


// actions
import {getUsersApi} from "../compo/api/api";

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SWITCH_IS_FETCHING = 'SWITCH_IS_FETCHING'
const SWITCH_IS_FOLLOWING = 'SWITCH_IS_FOLLOWING'

// state
let initialState = {
    users: [],
    pageSize: 5,
    ifFetching: true,
    totalUsersCount: 0,
    currentPage: 1,
    isFollowing: []
}

//reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
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
export const followSuccess  = (userId) => ({type: FOLLOW_USER, userId})
export const unfollowSuccess  = (userId) => ({type: UNFOLLOW_USER, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const switchIsFetching = (ifFetching) => ({type: SWITCH_IS_FETCHING, ifFetching})
export const switchIsFollowing= (ifFetching, userId) => ({type: SWITCH_IS_FOLLOWING, ifFetching, userId})

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(switchIsFetching(true));
        dispatch( getUsersApi(currentPage, pageSize))
            .then(data => {
                dispatch(switchIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}
export const follow = (userId) => {
    return (dispatch) => {
        dispatch( switchIsFollowing(true, userId));
        follow(userId)
            .then((r) => {
                if (r.data.resultCode === 0) {
                    dispatch( followSuccess(userId));
                }
                dispatch( switchIsFollowing(false, userId));
            });
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch( switchIsFollowing(true, userId));
        unfollow(userId)
            .then((r) => {
                if (r.data.resultCode === 0) {
                    dispatch( unfollowSuccess(userId));
                }
                dispatch( switchIsFollowing(false, userId));
            });
    }
}

export default usersReducer