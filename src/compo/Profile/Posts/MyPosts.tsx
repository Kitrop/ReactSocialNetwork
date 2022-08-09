import posts from '../Posts/MyPosts.module.css';
import Post from './Post/Post';
import MyPostForm from "./MyPostForm";
import {useDispatch, useSelector} from "react-redux";
import {postsDataState} from "../../../redux/selectors/profileSelector";
import {actionType, addPostActionCreater} from "../../../redux/reducers/profileReducer";
import {AppStateType} from "../../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";



const MyPosts = () => {

    // STATE
    const postsData = useSelector((state: AppStateType) => postsDataState(state))

    // DISPATCH
    const dispatch: ThunkDispatch<AppStateType, any, actionType> = useDispatch()
    const addPostActionCreator_ = (newPostText: string) => dispatch(addPostActionCreater(newPostText))


    let postsElements = postsData.map(p => <Post name={p.name} text={p.text} />)
    let onAddPost = (newPostText: string) => {
        addPostActionCreator_(newPostText);
    };



    return (
        <div className={posts.postsBlock}>
            <div className={posts.myP}>
                <h3>MyPosts</h3>
            </div>
            <MyPostForm onAddPost={ onAddPost }/>
            <div className={posts.wallPost}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;