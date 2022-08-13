import {loginApi, profileApi, ResultCodesEnum, securityApi} from '../../compo/api/api'
import {Dispatch} from 'redux';
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux-store";

// Name action
const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA = 'GET_CAPTCHA'


// State
let initialState: InitialStateInterface = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    rememberMe: false,
    captchaUrl: null
}
export interface InitialStateInterface {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    rememberMe: boolean
    captchaUrl: string | null
}


// Reducer
const authReducer = (state = initialState, action: ActionsType): InitialStateInterface => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case GET_CAPTCHA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}



interface SetAuthUserDataInterface {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
interface SetAuthUserActionInterface {
    type: typeof SET_USER_DATA
    data: SetAuthUserDataInterface
}
interface SetCaptchaInterface {
    type: typeof GET_CAPTCHA
    payload: {captchaUrl: string}
}

type ActionsType = SetAuthUserActionInterface | SetCaptchaInterface
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>


// actionCreator
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserActionInterface => ({type: SET_USER_DATA, data: {id, email, login, isAuth}})
export const setCaptcha = (captchaUrl: string):SetCaptchaInterface => ({ type: GET_CAPTCHA, payload: {captchaUrl} })


// thunkCreator
export const loginMeThunk = () => async (dispatch: DispatchThunkType) => {
    let data = await profileApi.getLoginMeApi()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunk = (email: string, password: number, rememberMe: boolean, captcha: null | string) => async (dispatch: DispatchThunkType) => {
    let data = await loginApi.loginApi(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        await dispatch(loginMeThunk())
    }
    if (data.resultCode !== 0) {
        await dispatch(captchaSecurity())
    }
}
export const logoutThunk = () => async (dispatch: DispatchThunkType) => {
    let data = await loginApi.logoutApi()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const captchaSecurity = () => async (dispatch: DispatchThunkType) => {
    const response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(setCaptcha(captchaUrl))
}


export default authReducer