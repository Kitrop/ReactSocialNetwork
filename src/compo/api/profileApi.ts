// Types for Profile
import {PhotosType, ProfileType} from "../../redux/types/type";
import {instance, ResponseType} from "./api";


// API for Profile
export const profileApi = {
    getProfileAPI(userId: number | string){
        return instance.get<ProfileType>(`profile/` + userId)
            .then(r => r.data);
    },
    getProfileStatus(userId: number | string){
        return instance.get<string>(`profile/status/` + userId);
    },
    putProfileStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status});
    },
    putProfilePhoto(photos: any) {
        const formData = new FormData()
        formData.append('image', photos)
        return instance.put<ResponseType<PhotosType>>(`profile/photo`, formData, {headers: {
                'Content-Type': 'multipart/form-data'}
        })
    },
    putProfileInfo(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
    }
}
