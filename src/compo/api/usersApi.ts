import {PhotosType} from "../../redux/types/type";
import {instance, ResponseType} from './api'
import {AxiosPromise} from 'axios'


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


// API for UsersPage
export const userApi = {
    getUserApi(currentPage: number, pageSize?: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(r => r.data);
    },
    postUserApi(id: number | string) {
        return instance.post<ResponseType>(`follow/${id}`, {})
            .then(r => r.data);
    },
    deleteUserApi(id: number | string) {
        return instance.delete(`follow/${id}`).then(r => r.data) as Promise<ResponseType>
    }
}