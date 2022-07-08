import {createSelector} from "reselect";


const users = (state) => {
    return state.usersPage.users
}
export const usersSelector = createSelector(users, (users) => {
    return users
})


const pageSize = (state) => {
    return state.usersPage.pageSize
}
export const pageSizeSelector = createSelector(pageSize ,(pageSize) => {
    return pageSize
})


const totalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const totalUsersCountSelector = createSelector( totalUsersCount,(totalUsersCount) => {
    return totalUsersCount
})


const currentPage = (state) => {
    return state.usersPage.currentPage
}
export const currentPageSelector = createSelector(currentPage, (currentPage) => {
    return currentPage
})


export const ifFetching = (state) => {
    return state.usersPage.ifFetching
}
export const ifFetchingSelector = createSelector(ifFetching ,(ifFetching) => {
    return ifFetching
})


export const isFollowing = (state) => {
    return state.usersPage.isFollowing
}
export const isFollowingSelector = createSelector(isFollowing, (isFollowing) => {
    return isFollowing
})