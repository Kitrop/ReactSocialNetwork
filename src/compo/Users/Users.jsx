import styled from 'styled-components'
import Pagination from './Pagination'
import User from './User'


const BorderPageUsers = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.68);
  padding: 10px;
`

const Users = (props) => {
    return (
        <BorderPageUsers>
            <Pagination {...props}/>
            <User unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} users={props.users}/>
        </BorderPageUsers>
    )
}

export default Users