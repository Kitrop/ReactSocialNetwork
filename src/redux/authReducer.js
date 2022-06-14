import {getLoginApi} from "../compo/api/api";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state;
    }
}
// actionCreator
export const setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login} });

// thunkCreator
export const loginThunk = () => {
    return (dispatch) => {
        getLoginApi()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            });
    }
}


export default authReducer;