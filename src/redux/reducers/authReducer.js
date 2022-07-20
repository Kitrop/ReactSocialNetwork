import {loginApi, profileApi, securityApi} from '../../compo/api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA = 'GET_CAPTCHA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    rememberMe: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
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
            return state;
    }
}


// actionCreator
export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth} });
export const setCaptcha = (captchaUrl) => ({
    type: GET_CAPTCHA, payload: {captchaUrl}
});


// thunkCreator
export const loginMeThunk = () => async (dispatch) => {
    let data = await profileApi.getLoginMeApi()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await loginApi.loginApi(email, password, rememberMe, captcha)
    if (data.data.resultCode === 0) {
        dispatch(loginMeThunk())
    }
    if (data.data.resultCode !== 0) {
        dispatch(captchaSecurity())
    }
}
export const logoutThunk = () => async (dispatch) => {
    let data = await loginApi.logoutApi()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const captchaSecurity = () => async (dispatch) => {
    const response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptcha(captchaUrl))
}


export default authReducer;