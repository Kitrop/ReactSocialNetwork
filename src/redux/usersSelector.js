export const users = (state) => {
    return state.usersPage.users
}

export const pageSize = (state) => {
    return state.usersPage.pageSize
}

export const totalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const currentPage = (state) => {
    return state.usersPage.currentPage
}

export const ifFetching = (state) => {
    return state.usersPage.ifFetching
}

export const isFollowing = (state) => {
    return state.usersPage.isFollowing
}

export const isAuth = (state) => {
    return state.auth.isAuth
}
