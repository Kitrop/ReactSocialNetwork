import styled from 'styled-components'
import Pagination from './Pagination'
import {FC, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {
    currentPageSelector,
    filterSelector,
    ifFetchingSelector,
    pageSizeSelector,
    portionSizeSelector,
    totalUsersCountSelector,
    usersSelector
} from '../../redux/selectors/usersSelector'
import {getIsAuthSelector} from '../../redux/selectors/authSelector'
import {ThunkDispatch} from 'redux-thunk'
import {
    ActionsType,
    FilterType,
    followThunk,
    getUserThunk,
    unfollowThunk,
    userActions
} from '../../redux/reducers/usersReducer'
import {useNavigate} from 'react-router-dom'
import Preloader from '../common/Preloader/Preloader'
import User from './User'
import UsersForm from './UsersForm'


// style
const BorderPageUsers = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.68);
  padding: 10px;
`

type Props = {
    titleText: string
}

const Users: FC<Props> = ({titleText = 'Users'}) => {

    // STATE
    const ifFetching = useSelector((state: AppStateType) => ifFetchingSelector(state))
    const isAuth = useSelector((state: AppStateType) => getIsAuthSelector(state))
    const currentPage = useSelector((state: AppStateType) => currentPageSelector(state))
    const filter = useSelector((state: AppStateType) => filterSelector(state))
    const totalUsersCount = useSelector((state: AppStateType) => totalUsersCountSelector(state))
    const pageSize = useSelector((state: AppStateType) => pageSizeSelector(state))
    const portionSize = useSelector((state: AppStateType) => portionSizeSelector(state))
    const users = useSelector((state: AppStateType) => usersSelector(state))


    // Dispatch Action Creator
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()

    // @todo const switchIsFollowing: any = (ifFetching: boolean, userId: number) => dispatch(userActions.switchIsFollowing(ifFetching, userId))
    const setCurrentPageAC = (currentPage: number) => dispatch(userActions.setCurrentPage(currentPage))

    // Dispatch Thunk. 1: follow user by id, 2: unfollow user by id, 3: get users by parameters
    const unfollowThunk_ = (id: number) => dispatch(unfollowThunk(id))
    const followThunk_ = (id: number) => dispatch(followThunk(id))
    const getUserThunk_ = useCallback((currentPage: number, filter: FilterType) => dispatch(getUserThunk(currentPage, filter)), [dispatch])


    // if user not login, redirect to /login
    let navigator = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigator('/login')
        }
        getUserThunk_(currentPage, filter)
    }, [navigator, isAuth, getUserThunk_, currentPage])


    // if page change
    const onPageChanged = (pageNumber: number, filter: FilterType) => {
        setCurrentPageAC(pageNumber)
        console.log('rerender')
        getUserThunk_(pageNumber, filter)
    }
    // if filter change
    const onFilterChanged = (filter: FilterType) => {
        getUserThunk_(currentPage, filter)
    }

    return (
        <BorderPageUsers>
            {ifFetching ? <Preloader/> : null}
            <UsersForm onFilterChanged={onFilterChanged}/>
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} portionSize={portionSize} filter={filter}/>
            <h2>{titleText}</h2>
            <User unfollowThunk={unfollowThunk_} followThunk={followThunk_} users={users}/>
        </BorderPageUsers>
    )
}

export default Users