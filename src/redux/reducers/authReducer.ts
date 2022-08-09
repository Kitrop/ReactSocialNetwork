import {loginApi, profileApi, securityApi} from '../../compo/api/api'
import {Dispatch} from 'redux';

// Name action
const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA = 'GET_CAPTCHA'

export interface InitialStateInterface {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    rememberMe: boolean
    captchaUrl: string | null
}
// State
let initialState: InitialStateInterface = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    rememberMe: false,
    captchaUrl: null
}

// Reducer
const authReducer = (state = initialState, action: any): InitialStateInterface => {
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

// actionCreator
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserActionInterface => ({type: SET_USER_DATA, data: {id, email, login, isAuth}})
export const setCaptcha = (captchaUrl: string):SetCaptchaInterface => ({ type: GET_CAPTCHA, payload: {captchaUrl} })


// thunkCreator
export const loginMeThunk = () => async (dispatch: any) => {
    let data = await profileApi.getLoginMeApi()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunk = (email: string | null, password: number | null, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let data = await loginApi.loginApi(email, password, rememberMe, captcha)
    if (data.data.resultCode === 0) {
        dispatch(loginMeThunk())
    }
    if (data.data.resultCode !== 0) {
        dispatch(captchaSecurity())
    }
}
export const logoutThunk = () => async (dispatch: any) => {
    let data = await loginApi.logoutApi()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const captchaSecurity = () => async (dispatch: Dispatch) => {
    const response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(setCaptcha(captchaUrl))
}


export default authReducer