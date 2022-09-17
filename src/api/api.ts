import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc'}
})

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: string[]
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

// Types for Captcha
type Captcha = {
    url: string
}

// API for Captcha
export const securityApi = {
    getCaptcha() {
        return instance.get<Captcha>(`/security/get-captcha-url`)
    }
}

