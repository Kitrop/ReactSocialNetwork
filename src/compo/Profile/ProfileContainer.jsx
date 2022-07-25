import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import Profile from './Profile'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    getProfileStatus,
    getProfileThunk,
    putProfileInfo,
    putProfileStatus,
    savePhoto,
    setUserProfile
} from '../../redux/reducers/profileReducer'
import {useNavigate, useParams} from 'react-router-dom'
import {getAuthId, getIsAuth} from '../../redux/selectors/authSelector'
import {profilePageState, profileStatusState} from '../../redux/selectors/profileSelector'

const ProfileContainer = (props) => {

    // STATE
    const profile = useSelector(state => profilePageState(state))
    const status = useSelector(state => profileStatusState(state))
    const isAuth = useSelector(state => getIsAuth(state))
    const authId = useSelector(state => getAuthId(state))

    // DISPATCH
    const dispatch = useDispatch()
    const setUserProfile_ = (profile) => dispatch(setUserProfile(profile))
    const getProfileThunk_ = (userId) => dispatch(getProfileThunk(userId))
    const getProfileStatus_ = (userId) => dispatch(getProfileStatus(userId))
    const putProfileStatus_ = (status) => dispatch(putProfileStatus(status))
    const savePhoto_ = (photos) => dispatch(savePhoto(photos))
    const putProfileInfo_ = (profile) => dispatch(putProfileInfo(profile))

    let navigate = useNavigate()
    useEffect(()=>{
        if(isAuth === false){
            return navigate("/login")
        }
    }, [navigate, isAuth])


    let {userId} = useParams()
    useEffect(() => {
        getProfileThunk_(userId)
        getProfileStatus_(userId)
    }, [userId, getProfileThunk_, getProfileStatus_]);


    return (
        <div className={myPosts.content}>
            <Profile {...props} isOwner={authId == userId} profile={profile} params={useParams()}
                     isAuth={isAuth} status={status} putProfileStatus={putProfileStatus_}
                     savePhoto={savePhoto_} putProfileInfo={putProfileInfo_}/>
        </div>
    );
}


export default ProfileContainer