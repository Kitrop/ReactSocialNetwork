import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Posts/MyPostsContainer";
import {useHistory} from "react-router-dom";

const Profile = (props) => {


    return (
        <div className={myPosts.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
}


export default Profile;