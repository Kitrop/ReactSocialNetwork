
// Types for Login
import {instance, ResponseType} from "./api";

type LoginType = {
    userId: number
}
type LoginMe = {
    id: number,
    email: string,
    login: string
}

// API for Login
export const loginApi = {
    loginApi(email: string, password: number, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginType>>('/auth/login',{email, password, rememberMe, captcha})
            .then(r => r.data);
    },
    logoutApi() {
        return instance.delete<ResponseType>('auth/login')
            .then(r => r.data);
    },
    getLoginMeApi() {
        return instance.get<ResponseType<LoginMe>>(`auth/me`)
            .then(r => r.data);
    }
}