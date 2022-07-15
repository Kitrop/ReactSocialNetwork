import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Posts/MyPostsContainer";
import {putProfileJob} from '../../redux/reducers/profileReducer'

const Profile = (props) => {

    return (
        <div className={myPosts.content}>
            <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile}
                         status={props.status} putProfileStatus={props.putProfileStatus} putProfileContacts={props.putProfileContacts} putProfileJob={props.putProfileJob}/>
            <MyPostsContainer />
        </div>
    );
}


export default Profile;