import {AppStateType} from '../redux-store'

export const profileStatusState = (state: AppStateType) => state.profilePage.status
export const profilePageState = (state: AppStateType) => state.profilePage.profile
export const profileState = (state: AppStateType) => state.profilePage
export const postsDataState = (state: AppStateType) => state.profilePage.postsData
