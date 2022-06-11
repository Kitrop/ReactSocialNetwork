import {
    follow, setCurrentPage, setTotalUsersCount, setUsers, switchIsFetching, unfollow
} from "../../redux/usersReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import Users from "./Users";
import Preloader from "../preloader/Preloader";
import {getUsersApi} from "../api/api";

function UsersContainer(props) {

    useEffect(() => {
        props.switchIsFetching(true);
        getUsersApi(props.currentPage, props.pageSize)
            .then(data => {
                props.switchIsFetching(false);
                props.setUsers(data.items);
                props.setTotalUsersCount(data.totalCount);
            });
    }, [])

    let onPageChanged = (pageNumber) => {
        props.switchIsFetching(true);
        props.setCurrentPage(pageNumber);
        getUsersApi(pageNumber, props.pageSize)
            .then(data => {
                props.switchIsFetching(false);
                props.setUsers(data.items)
            });
    }

    return <>
        {props.ifFetching ? <Preloader/> : <Users totalUsersCount={props.totalUsersCount}
                                                  pageSize={props.pageSize}
                                                  currentPage={props.currentPage}
                                                  onPageChanged={onPageChanged}
                                                  users={props.users}
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
        ifFetching: state.usersPage.ifFetching
    }
}

export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, switchIsFetching})(UsersContainer)

