import {createSelector} from "reselect";


// state
const users = (state) => state.usersPage.users
const pageSize = (state) => state.usersPage.pageSize
const totalUsersCount = (state) => state.usersPage.totalUsersCount
const currentPage = (state) => state.usersPage.currentPage
const ifFetching = (state) => state.usersPage.ifFetching
const isFollowing = (state) => state.usersPage.isFollowing

// selectors
export const usersSelector = createSelector(users, (users) => {
    return users
})

export const pageSizeSelector = createSelector(pageSize ,(pageSize) => {
    return pageSize
})

export const totalUsersCountSelector = createSelector( totalUsersCount,(totalUsersCount) => {
    return totalUsersCount
})

export const currentPageSelector = createSelector(currentPage, (currentPage) => {
    return currentPage
})

export const ifFetchingSelector = createSelector(ifFetching ,(ifFetching) => {
    return ifFetching
})

export const isFollowingSelector = createSelector(isFollowing, (isFollowing) => {
    return isFollowing
})