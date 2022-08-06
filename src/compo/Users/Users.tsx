import styled from 'styled-components'
import Pagination from './Pagination'
import User from './User'
import {UsersInterface} from "../../redux/types/type";
import { FC } from 'react';


// style
const BorderPageUsers = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.68);
  padding: 10px;
`



// type Props for component
type Props = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number, pageSize?: number) => void
    portionSize: number
    isFollowing: []
    unfollowThunk: Function
    followThunk: Function
    users: UsersInterface
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    switchIsFollowing: (ifFetching: boolean, userId: number) => void
}

const Users: FC<Props> =  ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize, unfollowThunk, followThunk, users, follow}) => {



    return (
        <BorderPageUsers>
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} portionSize={portionSize} />
            <User unfollowThunk={unfollowThunk} followThunk={followThunk} users={users} follow={follow} />
        </BorderPageUsers>
    )
}

export default Users