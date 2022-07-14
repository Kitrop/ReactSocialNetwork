import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from "./reducers/profileReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import friendsReducer from "./reducers/friendsReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";

let reducersPack = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducersPack,composeEnhancers( applyMiddleware(thunk)));

window.store = store;

export default store;