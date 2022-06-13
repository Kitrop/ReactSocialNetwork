import {
    followSuccess,
    getUsersThunkCreator,
    setCurrentPage,
    unfollow,
    switchIsFollowing,
    follow,
    unfollowSuccess
} from "../../redux/usersReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import Users from "./Users";
import Preloader from "../preloader/Preloader";


function UsersContainer(props) {

    useEffect(() => {
        props.getUsersThunkCreator(props.currentPage, props.pageSize)
    }, [])

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        props.getUsersThunkCreator(pageNumber, props.pageSize)
    }

    return <>
        {props.ifFetching ? <Preloader/> : <Users totalUsersCount={props.totalUsersCount}
                                                  pageSize={props.pageSize}
                                                  currentPage={props.currentPage}
                                                  onPageChanged={onPageChanged}
                                                  users={props.users}
                                                  followSuccess={props.followSuccess}
                                                  unfollowSuccess={props.unfollowSuccess}
                                                  switchIsFollowing={props.switchIsFollowing}
                                                  isFollowing={props.isFollowing}
                                                  follow={props.follow}
                                                  unfollow={props.unfollow}/>}
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
    {followSuccess, unfollowSuccess, setCurrentPage, switchIsFollowing, getUsersThunkCreator, follow, unfollow})(UsersContainer)

