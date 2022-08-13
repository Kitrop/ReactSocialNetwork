import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from "./reducers/profileReducer"
import dialogsReducer from "./reducers/dialogsReducer"
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"
import thunk from "redux-thunk";
import appReducer from './reducers/appReducer'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
window.store = store

export default store