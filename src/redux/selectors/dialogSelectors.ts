import {AppStateType} from '../redux-store'

export const getMessage = (state: AppStateType) => state.dialogsPage

export const getIsAuth = (state: AppStateType) => state.auth.isAuth
