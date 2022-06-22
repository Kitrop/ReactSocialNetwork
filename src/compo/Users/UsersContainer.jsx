import {
    follow, followThunk,
    getUserThunk,
    setCurrentPage,
    switchIsFollowing,
    unfollow,
    unfollowThunk
} from "../../redux/usersReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import Users from "./Users";
import Preloader from "../preloader/Preloader";

function UsersContainer(props) {

    useEffect(() => {
        props.getUserThunk()
    }, [])

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        props.getUserThunk(pageNumber)
    }

    return <>
        {props.ifFetching ? <Preloader/> : <Users totalUsersCount={props.totalUsersCount}
                                                  pageSize={props.pageSize}
                                                  currentPage={props.currentPage}
                                                  onPageChanged={onPageChanged}
                                                  users={props.users}
                                                  follow={props.follow}
                                                  unfollow={props.unfollow}
                                                  switchIsFollowing={props.switchIsFollowing}
                                                  isFollowing={props.isFollowing}
                                                  unfollowThunk={props.unfollowThunk}
                                                  followThunk={props.followThunk}/>}
    </>
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        ifFetching: state.usersPage.ifFetching,
        isFollowing: state.usersPage.isFollowing
    }
}

export default connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, switchIsFollowing, getUserThunk, unfollowThunk, followThunk})(UsersContainer)

