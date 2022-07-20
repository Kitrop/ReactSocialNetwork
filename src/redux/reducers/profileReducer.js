import {profileApi} from '../../compo/api/api'


// actions
const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'GET_PROFILE_STATUS'
const UPDATE_PROFILE_STATUS = 'UPDATE_PROFILE_STATUS'
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO'


// state
let initialState = {
    postsData: [
        {id: 1, name: 'Evgeniy', text: 'I need more React', like: '16'},
        {id: 2, text: 'I love REACT!!!', like: '45'}
    ],
    newPostText: 'it-sphere',
    profile: null,
    status: null
}

//reducer
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                name: 'Oleg',
                text: action.newPostText,
                like: '56'
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        }
        case DELETE_POST: {
            return {...state, postsData: state.postsData.filter(p => p.id !== action.id)}
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
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default: {
            return state
        }
    }
}

// actionCreater
export const addPostActionCreater = (newPostText) => ({type: ADD_POST, newPostText})
export const deletePostAC = (id) => ({type: DELETE_POST, id})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setProfileStatus = (status) => ({type: SET_PROFILE_STATUS, status})
export const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTO, photos})


// thunkCreator
export const getProfileThunk = (userId) => async (dispatch) => {
    let data = await profileApi.getProfileAPI(userId)
    dispatch(setUserProfile(data))
}
export const getProfileStatus = (userId) => async (dispatch) => {
    let data = await profileApi.getProfileStatus(userId)
    dispatch(setProfileStatus(data.data))
}
export const putProfileStatus = (status) => async (dispatch) => {
    let data = await profileApi.putProfileStatus(status)
    if (data.data.resultCode === 0) {
        dispatch(setProfileStatus(status))
    }
}
export const savePhoto = (photos) => async (dispatch) => {
    let data = await profileApi.putProfilePhoto(photos)
    if (data.data.resultCode === 0) {
        dispatch(setProfilePhoto(data.data.data.photos))
    }
}

export const putProfileInfo = (profile) => async (dispatch, getState) => {
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