import {
    follow,
    followThunk,
    getUserThunk,
    setCurrentPage,
    switchIsFollowing,
    unfollow,
    unfollowThunk
} from "../../redux/reducers/usersReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {useNavigate} from "react-router-dom";
import {
    currentPage, currentPageSelector,
    ifFetching, ifFetchingSelector,
    isFollowing, isFollowingSelector,
    pageSize, pageSizeSelector,
    totalUsersCount, totalUsersCountSelector,
    usersSelector
} from "../../redux/selectors/usersSelector";
import {getIsAuth} from "../../redux/selectors/authSelector";

function UsersContainer(props) {

    let navigator = useNavigate()
    useEffect(() => {
        if (props.isAuth === false) {
            return navigator('/login')
        }
    }, [navigator, props.isAuth])

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
        users: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalUsersCount: totalUsersCountSelector(state),
        currentPage: currentPageSelector(state),
        ifFetching: ifFetchingSelector(state),
        isFollowing: isFollowingSelector(state),
        isAuth: getIsAuth(state)
    }
}

export default connect(mapStateToProps, {follow, unfollow, setCurrentPage, switchIsFollowing, getUserThunk, unfollowThunk, followThunk})(UsersContainer)

