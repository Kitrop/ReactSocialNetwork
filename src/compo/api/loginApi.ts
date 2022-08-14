
// Types for Login
import {instance} from "./api";

export enum ResultCodesEnum  {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
type LoginType = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {userId: number}
}
type Logout = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {}
}

// API for Login
export const loginApi = {
    loginApi(email: string, password: number, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>('/auth/login',{email, password, rememberMe, captcha})
            .then(r => r.data);
    },
    logoutApi() {
        return instance.delete<Logout>('auth/login')
            .then(r => r.data);
    },
}