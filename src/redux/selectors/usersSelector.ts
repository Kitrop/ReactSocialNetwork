import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";


// State
const users = (state: AppStateType) => state.usersPage.users
const pageSize = (state: AppStateType) => state.usersPage.pageSize
const portionSize = (state: AppStateType) => state.usersPage.portionSize
const totalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount
const currentPage = (state: AppStateType) => state.usersPage.currentPage
const ifFetching = (state: AppStateType) => state.usersPage.ifFetching
const isFollowing = (state: AppStateType) => state.usersPage.isFollowing

// Selectors
export const usersSelector = createSelector(users, (users) => {
    return users
})
export const pageSizeSelector = createSelector(pageSize ,(pageSize) => {
    return pageSize
})
export const portionSizeSelector = createSelector(portionSize, (portionSize) => {
    return portionSize
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