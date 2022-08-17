import myPosts from './Profile.module.css'
import '../Profile/Posts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {useDispatch, useSelector} from 'react-redux'
import {profilePageSelector, profileStatusSelector} from '../../redux/selectors/profileSelector'
import {getAuthIdSelector, getIsAuthSelector} from '../../redux/selectors/authSelector'
import {
    getProfileStatus,
    getProfileThunk,
    putProfileInfo,
    putProfileStatus,
    savePhoto
} from '../../redux/reducers/profileReducer'
import {useNavigate, useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {AppStateType} from '../../redux/redux-store'
import {ThunkDispatch} from 'redux-thunk'
import {ProfileType} from '../../redux/types/type'
import MyPosts from '../Profile/Posts/MyPosts'

const Profile = () => {

    // STATE
    const profile = useSelector((state: AppStateType) => profilePageSelector(state))
    const status = useSelector((state: AppStateType) => profileStatusSelector(state))
    const isAuth = useSelector((state: AppStateType) => getIsAuthSelector(state))
    const authId = useSelector((state: AppStateType) => getAuthIdSelector(state))

    // DISPATCH
    const dispatch:ThunkDispatch<AppStateType, any, any> = useDispatch()
    // const setUserProfile_ = (profile: ProfileType) => dispatch(profileActions.setUserProfile(profile))
    const getProfileThunk_ = useCallback((userId: number) => dispatch(getProfileThunk(userId)), [dispatch])
    const getProfileStatus_ = useCallback((userId: number) => dispatch(getProfileStatus(userId)), [dispatch])
    const putProfileStatus_ = (status: string) => dispatch(putProfileStatus(status))
    const savePhoto_ = (photos: File) => dispatch(savePhoto(photos))
    const putProfileInfo_ = (profile: ProfileType) => dispatch(putProfileInfo(profile))

    let navigate = useNavigate()
    useEffect(()=>{
        if( !isAuth ) {
            return navigate("/login")
        }
    }, [navigate, isAuth])


    let {userId} = useParams<{userId?: any}>()
    useEffect(() => {
        getProfileThunk_(userId)
        getProfileStatus_(userId)
    }, [userId]);

    
    
    return (
        <div className={myPosts.content}>
            <ProfileInfo savePhoto={savePhoto_} isOwner={authId == userId} profile={profile}
                         status={status} putProfileStatus={putProfileStatus_} putProfileInfo={putProfileInfo_}/>
            <MyPosts />
        </div>
    );
}


export default Profile;