import {ResultCodesEnum, securityApi} from '../../compo/api/api'
import {ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";
import {loginApi} from '../../compo/api/loginApi';



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
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.data,
            }
        }
        case 'GET_CAPTCHA': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}




export type ActionsType = InferActionsTypes<typeof authActions>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>


// actionCreator
export const authActions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: 'SET_USER_DATA', data: {id, email, login, isAuth}} as const),
    setCaptcha: (captchaUrl: string) => ({ type: 'GET_CAPTCHA', payload: {captchaUrl} } as const)
}



// thunkCreator
export const loginMeThunk = () => async (dispatch: DispatchThunkType) => {
    let data = await loginApi.getLoginMeApi()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
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
        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
}
export const captchaSecurity = () => async (dispatch: DispatchThunkType) => {
    const response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(authActions.setCaptcha(captchaUrl))
}


export default authReducer