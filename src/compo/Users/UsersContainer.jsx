import {
    follow, setCurrentPage, setTotalUsersCount, setUsers, switchIsFetching, unfollow
} from "../../redux/usersReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../preloader/Preloader";

function UsersContainer(props) {

    useEffect(() => {
        props.switchIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
            .then(response => {
                props.switchIsFetching(false);
                props.setUsers(response.data.items);
                props.setTotalUsersCount(response.data.totalCount);
            });
    }, [])

    let onPageChanged = (pageNumber) => {
        props.switchIsFetching(true);
        props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`)
            .then(response => {
                props.switchIsFetching(false);
                props.setUsers(response.data.items)
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
    {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, switchIsFetching})
(UsersContainer)

