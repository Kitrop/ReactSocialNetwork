import {AppStateType} from "../redux-store";
import {createSelector} from "reselect";

// State
export const getLogin = (state: AppStateType) => state.auth.login
export const getIsAuth = (state: AppStateType) => state.auth.isAuth
export const getAuthId = (state: AppStateType) => state.auth.id
export const getCaptcha = (state: AppStateType) => state.auth.captchaUrl


// Selector
export const getLoginSelector = createSelector(getLogin, (getLogin) => {
    return getLogin
})

export const getIsAuthSelector = createSelector(getIsAuth, (getIsAuth) => {
    return getIsAuth
})

export const getAuthIdSelector = createSelector(getAuthId, (getAuthId) => {
    return getAuthId
})

export const getCaptchaSelector = createSelector(getCaptcha, (getCaptcha) => {
    return getCaptcha
})