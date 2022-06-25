import posts from '../Posts/MyPosts.module.css';
import Wall from './Post/Post.jsx';
import {createRef} from "react";
import {addPostActionCreater, updPostActionCreater} from "../../../redux/profileReducer";

function MyPosts(props) {

    let postsElements =
        props.postsData.map(p => <Wall name={p.name} key={p.id} text={p.text} likeCount={p.like}/>)

    let newPostElement = createRef();
    let onAddPost = () => {
        props.addPostActionCreater();
    };

    let onPostChange = () => {
        let textPost = newPostElement.current.value;
        props.updPostActionCreater(textPost);
    }
    return (
        <div className={posts.postsBlock}>
            <div className={posts.myP}>
                <h3>MyPosts</h3>
            </div>
            <div>
                <textarea className={posts.textarea} onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
            </div>
            <div>
                <button className={posts.mybutton} onClick={onAddPost}>Add post</button>
            </div>
            <div className={posts.wallPost}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;