import {addPostActionCreater} from "../../../redux/reducers/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {newPostTextState, postsDataState, profileState} from "../../../redux/selectors/profileSelector";


const mapStateToProps = (state) => {
    return {
        profilePage: profileState(state),
        postsData: postsDataState(state),
        newPostText: newPostTextState(state)
    }
}


const MyPostsContainer = connect(mapStateToProps, {addPostActionCreater})(MyPosts)

export default MyPostsContainer;

