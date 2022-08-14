// Types for UsersPage
import {PhotosType} from "../../redux/types/type";
import {instance} from "./api";
import { ResultCodesEnum } from "./loginApi";

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