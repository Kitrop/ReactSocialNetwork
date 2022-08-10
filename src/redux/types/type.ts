// profile
export type PostDataType = {
    name: string
    text: string
    like: string | number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    large: string | null
    small: string | null
}
export type ProfileType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

// users
export type UsersInterface = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}

// dispatch
