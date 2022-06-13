import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc"}
});

export const usersAPI = {
    getUsersApi(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(r => {
                return r.data;
            });


    },
    follow(id) {
        return instance.post(`follow/${id}`)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
    },
    getProfileApi(userId) {
        return instance.get(`profile/` + userId)
            .then(r => {
                return r.data
            })
    },
    getLoginApi() {
        return instance.get(`auth/me`)
            .then(r => {
                return r.data
            })
    }

}