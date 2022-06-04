import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import MyPosts from "./Posts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Posts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div className={myPosts.content}>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    );
}


export default Profile;