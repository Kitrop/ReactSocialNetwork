import {PhotosType, PostDataType, ProfileType } from '../types/type'
import {ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";
import {ResultCodesEnum} from '../../api/api'
import { profileApi } from '../../api/profileApi';
import profile from '../../compo/Profile/Profile'



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

const profileReducer = (state = initialState, action: ActionsType):initialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET_PROFILE_STATUS': {
            return {...state, status: action.status}
        }
        case 'SET_PROFILE_PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default: {
            return state
        }
    }
}


// interfaces

export type ActionsType = InferActionsTypes<typeof profileActions>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>

// actionCreator
export const profileActions = {
    addPostActionCreater: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUserProfile:  (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setProfileStatus: (status: string) => ({type: 'SET_PROFILE_STATUS', status} as const),
    setProfilePhoto: (photos: PhotosType) => ({type: 'SET_PROFILE_PHOTO', photos} as const),
}


// thunkCreator
export const getProfileThunk = (userId: number | string) => async (dispatch: DispatchThunkType) => {
    let data = await profileApi.getProfileAPI(userId)
    dispatch(profileActions.setUserProfile(data))
}
export const getProfileStatus = (userId: number | string) => async (dispatch: DispatchThunkType) => {
    let data = await profileApi.getProfileStatus(userId)
    dispatch(profileActions.setProfileStatus(data))
}
export const putProfileStatus = (status: string) => async (dispatch: DispatchThunkType) => {
    let data = await profileApi.putProfileStatus(status)
    if (data.data.resultCode === ResultCodesEnum.Success) {
        dispatch(profileActions.setProfileStatus(status))
    }
}
export const savePhoto = (photos: File) => async (dispatch: DispatchThunkType) => {
    let data = await profileApi.putProfilePhoto(photos)
    if (data.data.resultCode === 0) {
        dispatch(profileActions.setProfilePhoto(data.data.data))
    }
}
export const putProfileInfo = (profile: ProfileType) => async (dispatch: DispatchThunkType, getState: any) => {
    const userId = getState().auth.userId
    let data = await profileApi.putProfileInfo(profile)
    if (data.data.resultCode === ResultCodesEnum.Success) {
        if (userId !== null) {
            dispatch(getProfileThunk(userId)).then(r => r)
        }
        else {
            throw new Error('userId not be found')
        }
    }
    else {
        return Promise.reject(data.data.messages[0])
    }
}


export default profileReducer
