import styled from 'styled-components'
import Pagination from './Pagination'
import {FC, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import {
    currentPageSelector,
    filterSelector,
    ifFetchingSelector,
    isFollowingSelector,
    pageSizeSelector,
    portionSizeSelector,
    totalUsersCountSelector,
    usersSelector
} from '../../redux/selectors/usersSelector'
import {getIsAuthSelector} from '../../redux/selectors/authSelector'
import {ThunkDispatch} from 'redux-thunk'
import {ActionsType, FilterType, followThunk, getUserThunk, unfollowThunk} from '../../redux/reducers/usersReducer'
import {useNavigate, useSearchParams} from 'react-router-dom'
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
    const isFetching = useSelector((state: AppStateType) => isFollowingSelector(state))

    // Dispatch Action Creator
    const dispatch: ThunkDispatch<AppStateType, unknown, ActionsType> = useDispatch()

    // Dispatch Thunk
    const unfollowThunk_ = (id: number) => dispatch(unfollowThunk(id))
    const followThunk_ = (id: number) => dispatch(followThunk(id))
    const getUserThunk_ = useCallback((currentPage: number, filter: FilterType) => dispatch(getUserThunk(currentPage, filter)), [dispatch])


    // If user not login, redirect to /login
    let navigator = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigator('/login')
        }
        getUserThunk_(currentPage, filter).then(r => r)
    }, [navigator, isAuth, getUserThunk_])


    let [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        const result: any = {}
        // @ts-ignore
        // пробегаемся по URL, где есть ключ(term или friend) и значение(строка или boolean)
        for (const [key, value] of searchParams.entries()) {
            let urlValue: any = +value
            // если urlValue ничему не равен, то ему присваевается value
            if (isNaN(urlValue)) {
                urlValue = value
            }
            if (urlValue === 'true') {
                urlValue = true
            } else if (urlValue === 'false') {
                urlValue = false
            }
            // помещаем результат в объект
            result[key] = urlValue
        }
        // присваиваем страницу
        let actualPage = result.page || currentPage

        // присваиваем строку поиска
        let term = result.term || filter.term

        // присваиваем друга
        let friend = result.friend || filter.friend

        // если в url нету friend или он равен false, присваиваем параметр из бизнеса
        if (result.friend === false) {
            friend = result.friend
        }

        // определяем актуальный фильтер
        const currentFilter = {term, friend}

        getUserThunk_(actualPage, currentFilter).then(r => r)
    }, [])


    useEffect(() => {
        const term = filter.term
        const friend = filter.friend
        let url = (term === '' ? '' : `&term=${term}`) + (friend === null ? '' : `&friend=${friend}`) + (currentPage === 1 ? '' : `&page=${currentPage}`)
        setSearchParams(url)
    }, [filter, currentPage])


    // If page change
    const onPageChanged = (pageNumber: number, filter: FilterType) => {
        getUserThunk_(pageNumber, filter).then(r => r)
    }

    // If filter change
    const onFilterChanged = (filter: FilterType) => {
        getUserThunk_(1, filter).then(r => r)
    }

    return (
        <BorderPageUsers>
            {ifFetching ? <Preloader/> : null}
            <UsersForm onFilterChanged={onFilterChanged}/>
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                        onPageChanged={onPageChanged} portionSize={portionSize} filter={filter}/>
            <h2>{titleText}</h2>
            <User unfollowThunk={unfollowThunk_} followThunk={followThunk_} users={users} isFetching={isFetching}/>
        </BorderPageUsers>
    )
}

export default Users