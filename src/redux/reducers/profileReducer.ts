import {profileApi} from '../../compo/api/api'
import {PhotosType, PostDataType, ProfileType } from '../types/type'


// actions
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'GET_PROFILE_STATUS'
const UPDATE_PROFILE_STATUS = 'UPDATE_PROFILE_STATUS'
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO'


// state
let initialState = {
    postsData: [
        {name: 'Evgeniy', text: 'I need more React', like: '16'},
        {name: 'Evgeniy', text: 'I love REACT!!!', like: '45'}
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
}
export type initialStateType = typeof initialState

//reducer
interface NewPostInterface {
    name: string
    text: string
    like: string
}

const profileReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: NewPostInterface = {
                name: 'Oleg',
                text: action.newPostText,
                like: '56',
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_PROFILE_STATUS: {
            return {...state, status: action.status}
        }
        case UPDATE_PROFILE_STATUS: {
            return {...state, status: action.status}
        }
        case SET_PROFILE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default: {
            return state
        }
    }
}


// interfaces
interface AddPostInterface {
    type: typeof ADD_POST
    newPostText: string
}
interface SetUserProfileInterface {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
interface ProfileStatusInterface {
    type: typeof SET_PROFILE_STATUS
    status: string
}
interface ProfilePhotoInterface {
    type: typeof SET_PROFILE_PHOTO
    photos: PhotosType
}

// actionCreator
export const addPostActionCreater = (newPostText: string):AddPostInterface => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: ProfileType):SetUserProfileInterface => ({type: SET_USER_PROFILE, profile})
export const setProfileStatus = (status: string):ProfileStatusInterface => ({type: SET_PROFILE_STATUS, status})
export const setProfilePhoto = (photos: PhotosType):ProfilePhotoInterface => ({type: SET_PROFILE_PHOTO, photos})


// thunkCreator
export const getProfileThunk = (userId: number) => async (dispatch:any) => {
    let data = await profileApi.getProfileAPI(userId)
    dispatch(setUserProfile(data))
}
export const getProfileStatus = (userId: number) => async (dispatch:any) => {
    let data = await profileApi.getProfileStatus(userId)
    dispatch(setProfileStatus(data.data))
}
export const putProfileStatus = (status: string) => async (dispatch:any) => {
    let data = await profileApi.putProfileStatus(status)
    if (data.data.resultCode === 0) {
        dispatch(setProfileStatus(status))
    }
}
export const savePhoto = (photos: PhotosType) => async (dispatch:any) => {
    let data = await profileApi.putProfilePhoto(photos)
    if (data.data.resultCode === 0) {
        dispatch(setProfilePhoto(data.data.data.photos))
    }
}
export const putProfileInfo = (profile: ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId
    const data = await profileApi.putProfileInfo(profile)
    if (data.data.resultCode === 0) {
        dispatch(getProfileThunk(userId))
    }
    else {
        return Promise.reject(data.data.messages[0])
    }
}


export default profileReducer