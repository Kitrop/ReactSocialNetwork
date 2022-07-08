// actions
import {profileApi} from "../../compo/api/api";

const ADD_POST  = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'GET_PROFILE_STATUS'
const UPDATE_PROFILE_STATUS = 'UPDATE_PROFILE_STATUS'

// state
let initialState = {
    postsData: [
        {name: 'Evgeniy', text: 'I need more React', like: '16'},
        {text: 'I love REACT!!!', like: '45'},
    ],
    newPostText: 'it-sphere',
    profile: null,
    status: null
};

//reducer
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
            name: 'Oleg',
            text: action.newPostText,
            like: '56',
        };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
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
        default: {
            return state
        }
    }
}
// actionCreater
export const addPostActionCreater = (newPostText) =>({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setProfileStatus = (status) => ({type: SET_PROFILE_STATUS, status})

// thunkCreator
export const getProfileThunk = (userId) => {
    return (dispatch) => {
        profileApi.getProfileAPI(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }
}
export const getProfileStatus = (userId) => {
    return (dispatch) => {
        profileApi.getProfileStatus(userId)
            .then(data => {
                dispatch(setProfileStatus(data.data))
            })
    }
}
export const putProfileStatus = (status) => {
    return (dispatch) => {
        profileApi.putProfileStatus(status)
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(setProfileStatus(status))
                }
            })
    }
}


export default profileReducer;