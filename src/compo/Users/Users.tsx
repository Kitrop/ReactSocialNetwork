import styled from 'styled-components'
import Pagination from './Pagination'
import {FC, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    currentPageSelector,
    ifFetchingSelector,
    pageSizeSelector,
    portionSizeSelector,
    totalUsersCountSelector,
    usersSelector
} from "../../redux/selectors/usersSelector";
import {getIsAuth} from "../../redux/selectors/authSelector";
import {ThunkDispatch} from "redux-thunk";
import {followThunk, getUserThunk, setCurrentPage, unfollowThunk} from "../../redux/reducers/usersReducer";
import {useNavigate} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import User from "./User";


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
    const isAuth = useSelector((state: AppStateType) => getIsAuth(state))
    const currentPage = useSelector((state: AppStateType) => currentPageSelector(state))
    const totalUsersCount = useSelector((state: AppStateType) => totalUsersCountSelector(state))
    const pageSize = useSelector((state: AppStateType) => pageSizeSelector(state))
    const portionSize = useSelector((state: AppStateType) => portionSizeSelector(state))
    const users = useSelector((state: AppStateType) => usersSelector(state))


    // Dispatch Action Creator
    const dispatch: ThunkDispatch<AppStateType, any, any> = useDispatch()

    const switchIsFollowing: any = (ifFetching: boolean, userId: number) => dispatch(switchIsFollowing(ifFetching, userId))
    const setCurrentPageAC = (currentPage: number) => dispatch(setCurrentPage(currentPage))

    // Dispatch Thunk
    const unfollowThunk_ = (id: number) => dispatch(unfollowThunk(id))
    const followThunk_ = (id: number) => dispatch(followThunk(id))
    const getUserThunk_ = useCallback((currentPage: number) => dispatch(getUserThunk(currentPage)), [dispatch])


    // if user not login, redirect to /loginФ
    let navigator = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigator('/login')
        }
        getUserThunk_(currentPage)
    }, [navigator, isAuth, getUserThunk_, currentPage])


    // if page change
    const onPageChanged = (pageNumber: number) => {
        setCurrentPageAC(pageNumber)
        getUserThunk_(pageNumber)
    }

    return (
        <BorderPageUsers>
            {ifFetching ? <Preloader/> : null}
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} portionSize={portionSize}/>
            <h2>{titleText}</h2>
            <User unfollowThunk={unfollowThunk_} followThunk={followThunk_} users={users}/>
        </BorderPageUsers>
    )
}

export default Users