import {addPostActionCreater, updPostActionCreater} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreater())
        },
        onPostChange: (textPost) => {
            dispatch(updPostActionCreater(textPost))
        },
    }
}*/

const MyPostsContainer = connect(mapStateToProps, {addPostActionCreater, updPostActionCreater})(MyPosts)

export default MyPostsContainer;

