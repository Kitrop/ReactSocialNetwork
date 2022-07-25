import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc"}
});

// API OLD
export const getUserApi = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(r => {
            return r.data
        });
};
export const postUserApi= (id) => {
    return instance.post(`follow/${id}`, {})
        .then(r => {
            return r.data
        });
};
export const deleteUserApi = (id) => {
    return instance.delete(`follow/${id}`)
        .then(r => {
            return r.data
        });
}
export const getLoginApi = () => {
    return instance.get(`auth/me`)
        .then(r => {
            return r.data
        });
}


// API
export const userApi = {
    getUserApi(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(r => r.data);
    },
    postUserApi(id){
        return instance.post(`follow/${id}`, {})
            .then(r => r.data);
    },
    deleteUserApi(id){
        return instance.delete(`follow/${id}`)
            .then(r => r.data);
    }
}
export const profileApi = {
    getProfileAPI(userId){
        return instance.get(`profile/` + userId)
            .then(r => r.data);
    },
    getLoginMeApi() {
        return instance.get(`auth/me`)
            .then(r => r.data);
    },
    getProfileStatus(userId){
        return instance.get(`profile/status/` + userId);
    },
    putProfileStatus(status) {
        return instance.put(`profile/status/`, {status });
    },
    putProfilePhoto(photos) {
        const formData = new FormData()
        formData.append('image', photos)
        return instance.put(`profile/photo`, formData, {headers: {
            'Content-Type': 'multipart/form-data'}
        })
    },
    putProfileInfo(profile) {
        return instance.put(`profile`, profile)
    }
}
export const loginApi = {
    loginApi(email, password, rememberMe = false, captcha = null) {
        return instance.post('/auth/login',{email, password, rememberMe, captcha})
            .then(r => r.data);
    },
    logoutApi() {
        return instance.delete('auth/login')
            .then(r => r.data);
    },
}
export const securityApi = {
    getCaptcha() {
        return instance.get(`/security/get-captcha-url`)
    }
}
