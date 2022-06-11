import ums from "./Users.module.css";
import userPhoto from "../../img/avatar.jpg";
import styled from "styled-components";
import {NavLink} from "react-router-dom"
import axios from "axios";

const BorderPageUsers = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.68);
  padding: 10px;
`

function Users(props) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 15) {
            pages.push(i);
        }
    }

    return <BorderPageUsers>
        <div className={ums.num_bar}>
            {pages.map(p => <span className={props.currentPage === p && ums.selected}
                                  onClick={(e) => {
                                      props.onPageChanged(p)
                                  }}> {p}
            </span>)}
        </div>

        {props.users.map(u => <div className={ums.profile} key={u.id}>
            {/*// for avatar and button "follow"*/}
            <span>
                    <div> <NavLink to={'/profile/' + u.id}><img src={u.photos.small != null ? u.photos.small : userPhoto} className={ums.ava_photo} alt={"profile avatar"}/></NavLink> </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {withCredentials: true, headers: {"API-KEY": "fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc"}}).then((r) => {
                                    if (r.data.resultCode === 0) {props.unfollow(u.id)}
                                })
                            }}> Follow </button> :
                            <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {withCredentials: true, headers: {"API-KEY": "fbf5b600-2f44-40fb-bc63-1e40c8ffb8fc"}}).then((r) => {
                                    if (r.data.resultCode === 0) {
                                        props.follow(u.id)}
                                })
                            }}> Unfollow </button>
                        }
                    </div>
                </span>
            {/*for name, location and status*/}
            <span>
                {/* for name and status*/}
                <span>
                    <div className={ums.profile_name}> {u.name} </div>
                    <div className={ums.description}> {u.status} </div>
                </span>
            </span>
        </div>)}</BorderPageUsers>
}

export default Users