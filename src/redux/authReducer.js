const SET_USER_DATA = 'SET_USER_DATA'
const ERROR_LOGIN = 'ERROR_LOGIN'

let initialState = {
    email: null,
    id: null,
    login: null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {return {...state, ...action.data}}
        case ERROR_LOGIN: {return {...state}}
        default: {return {state}}
    }
}

export const setUserData = (id, email, login) => ({type: SET_USER_DATA, data:{id, email, login}});
export default authReducer;