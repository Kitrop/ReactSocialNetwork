export const getLogin = (state) => {
    return state.auth.login
}

export const getIsAuth = (state) => {
    return state.auth.isAuth
}

export const getAuthId = (state) => {
    return state.auth.id
}

export const getCaptcha = (state) => {
    return state.auth.captchaUrl
}