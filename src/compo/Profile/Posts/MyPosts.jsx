import posts from '../Posts/MyPosts.module.css';
import Post from './Post/Post.jsx';
import MyPostForm from "./MyPostForm";



const MyPosts = ({postsData, addPostAC}) => {

    let postsElements = postsData.map(p => <Post name={p.name} key={p.id} text={p.text} likeCount={p.like}/>)
    let onAddPost = (newPostText) => {
        addPostAC(newPostText);
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