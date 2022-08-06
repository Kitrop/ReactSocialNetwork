import {followThunk, getUserThunk, setCurrentPage, unfollowThunk} from '../../redux/reducers/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useCallback, useEffect} from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {useNavigate} from 'react-router-dom'
import {
    currentPageSelector,
    ifFetchingSelector,
    isFollowingSelector,
    pageSizeSelector, portionSizeSelector,
    totalUsersCountSelector,
    usersSelector
} from '../../redux/selectors/usersSelector'
import {getIsAuth} from '../../redux/selectors/authSelector'
import {StateType} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";

const UsersContainer = () => {

    // STATE
    const ifFetching = useSelector( (state: StateType) => ifFetchingSelector(state))
    const isFollowing = useSelector((state: StateType) => isFollowingSelector(state))
    const isAuth = useSelector((state: StateType) => getIsAuth(state))
    const currentPage = useSelector( (state: StateType) => currentPageSelector(state))
    const totalUsersCount = useSelector( (state: StateType) => totalUsersCountSelector(state))
    const pageSize = useSelector( (state: StateType) => pageSizeSelector(state))
    const portionSize = useSelector( (state: StateType) => portionSizeSelector(state))
    const users = useSelector( (state: StateType) => usersSelector(state))



    // Dispatch Action Creator
    const dispatch: ThunkDispatch<any, any, any> = useDispatch()
    const unfollow: any = (userId: number) => dispatch(unfollow(userId))
    const follow: any = (userId: number) => dispatch(follow(userId))
    const switchIsFollowing: any = (ifFetching: boolean, userId: number) => dispatch(switchIsFollowing(ifFetching, userId))
    const setCurrentPageAC = (currentPage: number) => dispatch(setCurrentPage(currentPage))

    // Dispatch Thunk
    const unfollowThunk_ = (id: number) => dispatch(unfollowThunk(id))
    const followThunk_= (id: number) => dispatch(followThunk(id))
    const getUserThunk_ = useCallback((currentPage: number) => dispatch(getUserThunk(currentPage)), [dispatch])


    // if user not login, redirect to /loginФ
    let navigator = useNavigate()
    useEffect(() => {
        if (isAuth === false) { navigator('/login') }
        getUserThunk_(currentPage)
    }, [navigator, isAuth, getUserThunk_, currentPage])


    // if page change
    const onPageChanged = (pageNumber: number) => {
        setCurrentPageAC(pageNumber)
        getUserThunk_(pageNumber)
    }


    return <>
        {ifFetching ? <Preloader/> : <Users onPageChanged={onPageChanged}
                                            unfollow={unfollow}
                                            follow={follow}
                                            switchIsFollowing={switchIsFollowing}
                                            unfollowThunk={unfollowThunk_}
                                            followThunk={followThunk_}
                                            users={users}
                                            pageSize={pageSize}
                                            totalUsersCount={totalUsersCount}
                                            currentPage={currentPage}
                                            isFollowing={isFollowing}
                                            portionSize={portionSize}/>}
    </>
}

export default UsersContainer