import i from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../img/avatar.jpg'
import ProfileStatus from './ProfileStatus'
import {ChangeEvent, FC} from 'react'
import {ProfileType} from '../../../redux/types/type'
import ProfileAboutForm from './ProfileInfoAbout/ProfileAboutForm'
import {IconButton} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

type Props = {
    savePhoto: (photos: File) => void
    isOwner: boolean
    profile: ProfileType | null,
    status: string
    putProfileStatus: (status: string) => void
    putProfileInfo: (profile: ProfileType) => void
}

const ProfileInfo: FC<Props> = ({savePhoto, isOwner, profile, status, putProfileStatus, putProfileInfo}) => {

    if(!profile) {
        return <Preloader />
    }

    const onAvatarSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files?.length) {
            savePhoto(event.target.files[0])
        }
    }

    return (
        <div>
            <div className={i.descriptionBlock}>
                {/*FullName*/}
                <div className={i.info_profile}>{profile.fullName}</div>
                {/*Photos*/}
                <img className={i.profile_avatar} src={profile.photos.large != null ? profile.photos.large : userPhoto} alt={'avatar'}/>
                {isOwner && <span>  <IconButton color="primary" aria-label="upload picture" component="label"> <input hidden type={'file'} onChange={onAvatarSelected}/>  <PhotoCameraIcon /></IconButton>   </span> }
                {/*Status*/}
                <ProfileStatus isOwner={isOwner} statusProps={status} putProfileStatus={putProfileStatus} />
                <ProfileAboutForm isOwner={isOwner} profile={profile} putProfileInfo={putProfileInfo} />
            </div>
        </div>
    );
}

export default ProfileInfo;