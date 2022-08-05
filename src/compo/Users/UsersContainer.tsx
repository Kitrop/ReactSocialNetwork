import {followThunk, getUserThunk, setCurrentPage, unfollowThunk} from '../../redux/reducers/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {useNavigate} from 'react-router-dom'
import {
    currentPageSelector,
    ifFetchingSelector,
    isFollowingSelector,
    pageSizeSelector,
    totalUsersCountSelector,
    usersSelector
} from '../../redux/selectors/usersSelector'
import {getIsAuth} from '../../redux/selectors/authSelector'
import {StateType} from "../../redux/redux-store";

const UsersContainer = () => {

    // STATE
    const ifFetching = useSelector( (state: StateType) => ifFetchingSelector(state))
    const isFollowing = useSelector((state: StateType) => isFollowingSelector(state))
    const isAuth = useSelector((state: StateType) => getIsAuth(state))
    const currentPage = useSelector( (state: StateType) => currentPageSelector(state))
    const totalUsersCount = useSelector( (state: StateType) => totalUsersCountSelector(state))
    const pageSize = useSelector( (state: StateType) => pageSizeSelector(state))
    const users = useSelector( (state: StateType) => usersSelector(state))



    // Dispatch Action Creator
    const dispatch = useDispatch()
    const follow = (userId: number) => dispatch(follow(userId))
    const unfollow = (userId: number) => dispatch(unfollow(userId))
    const switchIsFollowing = (ifFetching: boolean, userId: number) => dispatch(switchIsFollowing(ifFetching, userId))
    const setCurrentPageAC = (currentPage: number) => dispatch(setCurrentPage(currentPage))

    // Dispatch Thunk
    const unfollowThunk_ = (id: number) => dispatch(unfollowThunk(id))
    const followThunk_= (id: number) => dispatch(followThunk(id))
    const getUserThunk_ = (currentPage: number, pageSize: number) => dispatch(getUserThunk(currentPage, pageSize))


    // if user not login, redirect to /login
    let navigator = useNavigate()
    useEffect(() => {
        if (isAuth === false) { navigator('/login') }
        getUserThunk_()
    }, [navigator, isAuth])

    // if page change
    const onPageChanged = (pageNumber: number) => {
        setCurrentPageAC(pageNumber)
        getUserThunk_(pageNumber)
    }


    return <>
        {ifFetching ? <Preloader/> : <Users onPageChanged={onPageChanged}
                                            follow={follow}
                                            unfollow={unfollow}
                                            switchIsFollowing={switchIsFollowing}
                                            unfollowThunk={unfollowThunk_}
                                            followThunk={followThunk_}
                                            users={users}
                                            pageSize={pageSize}
                                            totalUsersCount={totalUsersCount}
                                            currentPage={currentPage}
                                            isFollowing={isFollowing}
                                            isAuth={isAuth}
                                        />
        }
    </>
}

export default UsersContainer