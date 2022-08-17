import {AppStateType} from '../redux-store'
import {createSelector} from 'reselect'


// State
const profileStatus = (state: AppStateType) => state.profilePage.status
const profilePage = (state: AppStateType) => state.profilePage.profile
const postsData = (state: AppStateType) => state.profilePage.postsData


// Selector

export const profileStatusSelector = createSelector(profileStatus, (profileStatusState) => {
    return profileStatusState
})
export const profilePageSelector = createSelector(profilePage, (profilePage) => {
    return profilePage
})
export const postsDataSelector = createSelector(postsData, (postsData) => {
    return postsData
})
