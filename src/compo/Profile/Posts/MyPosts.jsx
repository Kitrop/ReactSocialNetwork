import posts from '../Posts/MyPosts.module.css';
import Wall from './Post/Post.jsx';
import MyPostForm from "./MyPostForm";



const MyPosts = (props) => {

    let postsElements = props.postsData.map(p => <Wall name={p.name} key={p.id} text={p.text} likeCount={p.like}/>)
    let onAddPost = (newPostText) => {
        props.addPostActionCreater(newPostText);
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