import Friend from "./Friend";
import {connect} from "react-redux";



const mapStateToProps = (state) => {
    return {
        friendsPage: state.friendsPage
    }
}

const mapDispatchToProps = () => {
    return {

    }
}

const FriendContainer = connect(mapStateToProps, mapDispatchToProps)(Friend)

export default FriendContainer;