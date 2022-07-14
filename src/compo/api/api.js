import axios from "axios";

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
export const getProfileAPI = (userId) => {
    return instance.get(`profile/` + userId)
        .then(r => {
            return r.data
        });
};
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
            .then(r => {
                return r.data
            });
    },
    postUserApi(id){
        return instance.post(`follow/${id}`, {})
            .then(r => {
                return r.data
            });
    },
    deleteUserApi(id){
        return instance.delete(`follow/${id}`)
            .then(r => {
                return r.data
            });
    }
}
export const profileApi = {
    getProfileAPI(userId){
        return instance.get(`profile/` + userId)
            .then(r => {
                return r.data
            });
    },
    getLoginMeApi() {
        return instance.get(`auth/me`)
            .then(r => {
                return r.data
            });
    },
    getProfileStatus(userId){
        return instance.get(`profile/status/` + userId);
    },
    putProfileStatus(status) {
        return instance.put(`profile/status`, { status: status });
    }
}
export const loginApi = {
    loginApi(email, password, rememberMe = false) {
        return instance.post('/auth/login',{email, password, rememberMe})
            .then(r => {
                return r.data
            });
    },
    logoutApi() {
        return instance.delete('/auth/login')
            .then(r => {
                return r.data
            });
    }
}
