import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import axios from "axios";
import {useParams, withRouter} from "react-router-dom";

const ProfileContainer = (props) => {
    let {userId} = useParams()
    useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                props.setUserProfile(response.data);
                console.log(response.data);
            });
    }, []);


    return (
        <div className={myPosts.content}>
            <Profile {...props} profile={props.profile} params={useParams()}/>
        </div>
    );

}
    let mapStateToProps = (state) => ({
        profile: state.profilePage.profile
    })



export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);