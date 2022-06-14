import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getProfileThunk, setUserProfile} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";

const ProfileContainer = (props) => {
    let {userId} = useParams()
    useEffect(() => {
        props.getProfileThunk(userId)
    }, []);


    return (
        <div className={myPosts.content}>
            <Profile {...props} profile={props.profile} params={useParams()}/>
        </div>
    );

}
    let mapStateToProps = (state) => ({
        profile: state.profilePage.profile
    });



export default connect(mapStateToProps, {setUserProfile, getProfileThunk})(ProfileContainer);