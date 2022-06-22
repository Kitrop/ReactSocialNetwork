import axios from "axios";
import {setUserProfile} from "../../redux/profileReducer";
import {setAuthUserData} from "../../redux/authReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc"}
});

// API
export const getUserApi = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(r => {
            return r.data
        })
};
export const postUserApi= (id) => {
    return instance.post(`follow/${id}`, {})
        .then(r => {
            return r.data
        })
};
export const deleteUserApi = (id) => {
    return instance.delete(`follow/${id}`)
        .then(r => {
            return r.data
        })
}
export const getProfileAPI = (userId) => {
    return instance.get(`profile/` + userId)
        .then(r => {
            return r.data
        })
};
export const getLoginApi = () => {
    return instance.get(`auth/me`)
        .then(r => {
            return r.data
        })
}
