// Types for Profile
import {PhotosType, ProfileType} from "../../redux/types/type";
import {instance} from "./api";
import { ResultCodesEnum } from "./loginApi";

type LoginMe = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: string[]
}
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
