import ums from './Users.module.css'
import {NavLink} from 'react-router-dom'
import userPhoto from '../../img/avatar.jpg'


const User = ({users, unfollowThunk, followThunk}) => {
    return (
        users.map(u =>
            <div className={ums.profile} key={u.id}>
            <span>
                    <div> <NavLink to={'/profile/' + u.id}> <img src={u.photos.small != null ? u.photos.small : userPhoto} className={ums.ava_photo} alt={'profile avatar'}/> </NavLink> </div>
                    <div>
                        {u.followed
                            ? <button className={ums.btn_unfollow} onClick={() => unfollowThunk(u.id)}>
                                Unfollow
                            </button>
                            : <button className={ums.btn_follow} onClick={() => followThunk(u.id)}>
                                Follow
                            </button>
                        }
                    </div>
            </span>
                <span>
                <span>
                    <div className={ums.profile_name}> {u.name} </div>
                    <div className={ums.description}> {u.status} </div>
                </span>
            </span>
            </div>)
    )
}

export default User