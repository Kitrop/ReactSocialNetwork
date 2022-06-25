import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getProfileThunk, setUserProfile} from "../../redux/profileReducer";
import {Navigate, useParams} from "react-router-dom";
import {RedirectToAuth} from "../hoc/RedirectToAuth";

const ProfileContainer = (props) => {
    let {userId} = useParams()
    useEffect(() => {
        props.getProfileThunk(userId)
    }, []);

    return (
        <div className={myPosts.content}>
            <Profile {...props} profile={props.profile} params={useParams()} isAuth={props.isAuth}/>
        </div>
    );

}

let mapStateToProps = (state) => ({
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    });

export default connect(mapStateToProps, {setUserProfile, getProfileThunk})(RedirectToAuth(ProfileContainer));