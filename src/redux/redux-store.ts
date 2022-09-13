import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from "./reducers/profileReducer"
import dialogsReducer from "./reducers/dialogsReducer"
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"
import thunk from "redux-thunk";
import appReducer from './reducers/appReducer'
import sidebarReducer from './reducers/sidebarReducer'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    sidebar: sidebarReducer
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

export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never

// @ts-ignore
window.store = store

export default store