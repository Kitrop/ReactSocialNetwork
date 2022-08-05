import styled from 'styled-components'
import Pagination from './Pagination'
import User from './User'
import {UsersInterface} from "../../redux/types/type";
import { FC } from 'react';


const BorderPageUsers = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.68);
  padding: 10px;
`



// type Props for component
type Props = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    portionSize: number
    unfollowThunk: Function
    followThunk: Function
    users: UsersInterface
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<Props> =  ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize, unfollowThunk, followThunk, users}) => {
    return (
        <BorderPageUsers>
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} portionSize={portionSize} />
            <User unfollowThunk={unfollowThunk} followThunk={followThunk} users={users}/>
        </BorderPageUsers>
    )
}

export default Users