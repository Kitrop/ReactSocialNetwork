/*import {rerenderEntireTree} from "../index"; */
/*    addPost() {
        let newPost = {
            name: 'Oleg',
            text: this._state.profilePage.newPostText,
            like: '56',
        };
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._rerenderEntireTree();
    },*/
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsReducer from "./friendsReducer";

let store= {
    _state: {
        // dialogsPage: {
        //     dialogsData: [
        //         {id: 1, name: "Dimych",},
        //         {
        //             id: 2,
        //             ava: 'https://avatars.mds.yandex.net/i?id=a7190ac7b0d5cc3862b9e0113bebd4d8-4318341-images-thumbs&n=13',
        //             name: "Evgeniy",
        //         },
        //         {
        //             id: 3,
        //             ava: 'https://avatars.mds.yandex.net/i?id=a7190ac7b0d5cc3862b9e0113bebd4d8-4318341-images-thumbs&n=13',
        //             name: "Sasha",
        //         },
        //     ],
        //     messagesData: [
        //         {
        //             id: 1,
        //             ava: "https://avatars.mds.yandex.net/i?id=a7190ac7b0d5cc3862b9e0113bebd4d8-4318341-images-thumbs&n=13",
        //             message: "Hello",
        //         },
        //         {
        //             id: 2,
        //             ava: "https://avatars.mds.yandex.net/i?id=a7190ac7b0d5cc3862b9e0113bebd4d8-4318341-images-thumbs&n=13",
        //             message: "How are you?",
        //         },
        //         {
        //             id: 3,
        //             ava: "https://avatars.mds.yandex.net/i?id=a7190ac7b0d5cc3862b9e0113bebd4d8-4318341-images-thumbs&n=13",
        //             message: "Chel",
        //         },
        //         {
        //             id: 4,
        //             ava: "https://avatars.mds.yandex.net/i?id=a7190ac7b0d5cc3862b9e0113bebd4d8-4318341-images-thumbs&n=13",
        //             message: "REACT REACT AND REDUX",
        //         },
        //     ],
        //     newMessageText: '',
        // },
        // profilePage: {
        //     postsData: [
        //         {name: 'Evgeniy', text: 'I need more React', like: '16'},
        //         {text: 'I love REACT!!!', like: '45'},
        //     ],
        //     newPostText: 'it-sphere'
        // },
        // friendsPage: {
        //     friendsData: [
        //         {username: 'Evgeniy1'},
        //         {username: 'Evgeniy2'},
        //         {username: 'Evgeniy3'},
        //     ],
        // },
    },
    _rerenderEntireTree() {
        console.log('it is it')
    },

    getState() {
        return this._state
    },
    subscribe(obs) {
        this._rerenderEntireTree = obs;
    },

    newTextUpdate(newText) {
        this._state.profilePage.newPostText = newText;
        this._rerenderEntireTree();
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendsPage = friendsReducer(this._state.friendsPage, action);
        this._rerenderEntireTree(this._state);
    },
};

window.store = store;
export default store;
