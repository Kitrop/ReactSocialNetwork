import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import axios from "axios";

const ProfileContainer = (props) => {

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                props.setUserProfile(response.data);
                console.log(response.data);
            });
    }, [])
    return (
        <div className={myPosts.content}>
            <Profile {...props} profile={props.profile}/>
        </div>
    );
}
    let mapStateToProps = (state) => ({
        profile: state.profilePage.profile
    })

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);