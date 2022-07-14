import {loginApi, profileApi} from "../../compo/api/api";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    rememberMe: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            return state;
    }
}
// actionCreator
export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth} });

// thunkCreator
export const loginMeThunk = () => async (dispatch) => {
    let data = await profileApi.getLoginMeApi()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunk = (email, password, rememberMe) => async (dispatch) => {
    let data = await loginApi.loginApi(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(loginMeThunk())
    }
}
export const logoutThunk = () => async (dispatch) => {
    let data = await loginApi.logoutApi()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}



export default authReducer;