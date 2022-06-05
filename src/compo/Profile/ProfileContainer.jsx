import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from "./Profile";
import {useEffect} from "react";
import axios from "axios";
import {connect} from "react-redux";

const ProfileContainer = (props) => {
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(r => {
                props.setUserProfile(r.data)
            });
    }, [])
    return (<div className={myPosts.content}>
                <Profile {...props}/>
            </div>
    );
}


export default connect()(ProfileContainer);