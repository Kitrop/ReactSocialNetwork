import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './Posts/MyPostsContainer'

const Profile = ({savePhoto, isOwner, profile, status, putProfileStatus, putProfileInfo}) => {

    return (
        <div className={myPosts.content}>
            <ProfileInfo savePhoto={savePhoto} isOwner={isOwner} profile={profile}
                         status={status} putProfileStatus={putProfileStatus} putProfileInfo={putProfileInfo}/>
            <MyPostsContainer />
        </div>
    );
}


export default Profile;