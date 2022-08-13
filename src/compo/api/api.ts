import axios from "axios";
import {PhotosType, ProfileType} from "../../redux/types/type";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc"}
});



// Types for UsersPage
type User = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}
type GetUsersType = {
    items: User[]
    totalCount: number
    error: string
}
type FollowUser = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {}
}
type UnfollowUser = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {}
}

// API for UsersPage
export const userApi = {
    getUserApi(currentPage: number, pageSize?: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(r => r.data);
    },
    postUserApi(id: number | string){
        return instance.post<FollowUser>(`follow/${id}`, {})
            .then(r => r.data);
    },
    deleteUserApi(id: number | string){
        return instance.delete<UnfollowUser>(`follow/${id}`)
            .then(r => r.data);
    }
}



// Types for Profile
type Status = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {}
}
type ProfilePhotoPut = {
    data: PhotosType
    resultCode: ResultCodesEnum
    messages: string[]
}
type ProfilePut = {
    resultCode: ResultCodesEnum
    messages: string[]
    data: {}
}

// API for Profile
export const profileApi = {
    getProfileAPI(userId: number | string){
        return instance.get<ProfileType>(`profile/` + userId)
            .then(r => r.data);
    },
    getLoginMeApi() {
        return instance.get<LoginMe>(`auth/me`)
            .then(r => r.data);
    },
    getProfileStatus(userId: number | string){
        return instance.get(`profile/status/` + userId);
    },
    putProfileStatus(status: string) {
        return instance.put<Status>(`profile/status/`, {status });
    },
    putProfilePhoto(photos: any) {
        const formData = new FormData()
        formData.append('image', photos)
        return instance.put<ProfilePhotoPut>(`profile/photo`, formData, {headers: {
            'Content-Type': 'multipart/form-data'}
        })
    },
    putProfileInfo(profile: ProfileType) {
        return instance.put<ProfilePut>(`profile`, profile)
    }
}



// Types for Login
export enum ResultCodesEnum  {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
type LoginMe = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: string[]
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

