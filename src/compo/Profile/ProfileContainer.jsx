import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getProfileStatus, getProfileThunk, putProfileStatus, setUserProfile} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom"

const ProfileContainer = (props) => {



    let navigate = useNavigate()
    useEffect(()=>{
        if(props.isAuth === false){
            return navigate("/login")
        }
    }, [props.isAuth])


    let {userId} = useParams()
    useEffect(() => {
        props.getProfileThunk(userId)
        props.getProfileStatus(userId)
    }, [userId]);

    return (
        <div className={myPosts.content}>
            <Profile {...props} profile={props.profile} params={useParams()} isAuth={props.isAuth} status = {props.status} putProfileStatus={props.putProfileStatus} />
        </div>
    );

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps,{setUserProfile, getProfileThunk, getProfileStatus, putProfileStatus})(ProfileContainer);