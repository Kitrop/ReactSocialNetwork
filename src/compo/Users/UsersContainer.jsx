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
import Preloader from "../Preloader/Preloader";
import {Navigate} from "react-router-dom";
import {RedirectToAuth} from "../hoc/RedirectToAuth";
import {
    currentPage,
    ifFetching,
    isAuth,
    isFollowing,
    pageSize,
    totalUsersCount,
    users
} from "../../redux/usersSelector";

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
                                                  followThunk={props.followThunk}
                                                  isAuth={props.isAuth}/>}
    </>
}

const mapStateToProps = (state) => {
    return {
        users: users(state),
        pageSize: pageSize(state),
        totalUsersCount: totalUsersCount(state),
        currentPage: currentPage(state),
        ifFetching: ifFetching(state),
        isFollowing: isFollowing(state),
        isAuth: isAuth(state)
    }
}

export default connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, switchIsFollowing, getUserThunk, unfollowThunk, followThunk})(RedirectToAuth(UsersContainer))

