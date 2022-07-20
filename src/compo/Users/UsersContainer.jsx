import {followThunk, getUserThunk, setCurrentPage, unfollowThunk} from '../../redux/reducers/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {useNavigate} from 'react-router-dom'
import {
    currentPage,
    currentPageSelector,
    ifFetchingSelector,
    isFollowingSelector,
    pageSize,
    pageSizeSelector,
    totalUsersCount,
    totalUsersCountSelector,
    usersSelector
} from '../../redux/selectors/usersSelector'
import {getIsAuth} from '../../redux/selectors/authSelector'

const UsersContainer = (props) => {

    // STATE
    const ifFetching = useSelector(state => ifFetchingSelector(state))
    const isFollowing = useSelector(state => isFollowingSelector(state))
    const isAuth = useSelector(state => getIsAuth(state))
    const currentPage = useSelector( state => currentPageSelector(state))
    const totalUsersCount = useSelector( state => totalUsersCountSelector(state))
    const pageSize = useSelector( state => pageSizeSelector(state))
    const users = useSelector( state => usersSelector(state))

    // DISPATCH AC
    const dispatch = useDispatch()
    const follow = (userId) => dispatch(follow(userId))
    const unfollow = (userId) => dispatch(unfollow(userId))
    const switchIsFollowing = (ifFetching, userId) => dispatch(switchIsFollowing(ifFetching, userId))
    const setCurrentPageAC = (currentPage) => dispatch(setCurrentPage(currentPage))

    // DISPATCH THUNK
    const unfollowThunk_ = (id) => dispatch(unfollowThunk(id))
    const followThunk_= (id) => dispatch(followThunk(id))
    const getUserThunk_ = (currentPage, pageSize) => dispatch(getUserThunk(currentPage, pageSize))

    // if user not login, redirect to /login
    // get users
    let navigator = useNavigate()
    useEffect(() => {
        if (isAuth === false) {
            navigator('/login')
        }
        getUserThunk_()
    }, [navigator, isAuth])

    // if page change
    let onPageChanged = (pageNumber) => {
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
                                            isAuth={isAuth}/>}
    </>
}

export default UsersContainer