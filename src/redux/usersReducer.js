// actions
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SWITCH_IS_FETCHING = 'SWITCH_IS_FETCHING'

// state
let initialState = {
    users: [],
    pageSize: 5,
    ifFetching: false,
    totalUsersCount: 0,
    currentPage: 1,
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


export default usersReducer