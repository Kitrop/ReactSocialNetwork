import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";

let reducersPack = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    usersPage: usersReducer
})

let store = createStore(reducersPack);

window.store = store;

export default store;