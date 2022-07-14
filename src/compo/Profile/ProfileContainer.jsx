import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getProfileStatus, getProfileThunk, putProfileStatus, setUserProfile} from "../../redux/reducers/profileReducer";
import {useNavigate, useParams} from "react-router-dom";
import {getIsAuth} from "../../redux/selectors/authSelector";
import {profilePageState, profileStatusState} from "../../redux/selectors/profileSelector";

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
    profile: profilePageState(state),
    status: profileStatusState(state),
    isAuth: getIsAuth(state)
});

export default connect(mapStateToProps,{setUserProfile, getProfileThunk, getProfileStatus, putProfileStatus})(ProfileContainer);