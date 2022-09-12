import i from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../img/avatar.jpg'
import ProfileStatus from './ProfileStatus'
import {ChangeEvent, FC, useState} from 'react'
import {ProfileType} from '../../../redux/types/type'
import Contacts from './ProfileInfoAbout/Contacts'
import ProfileAboutForm from './ProfileInfoAbout/ProfileAboutForm'
import ProfileAbout from './ProfileInfoAbout/ProfileAbout'


type Props = {
    savePhoto: (photos: File) => void
    isOwner: boolean
    profile: ProfileType | null,
    status: string
    putProfileStatus: (status: string) => void
    putProfileInfo: (profile: ProfileType) => void
}

const ProfileInfo: FC<Props> = ({savePhoto, isOwner, profile, status, putProfileStatus, putProfileInfo}) => {

    const [editMode, setEditMode] = useState(false)

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
                {isOwner && <span><input type={'file'} onChange={onAvatarSelected}/></span> }
                {/*Status*/}
                <ProfileStatus isOwner={isOwner} statusProps={status} putProfileStatus={putProfileStatus} />
                <ProfileAboutForm profile={profile} putProfileInfo={putProfileInfo} />
            </div>
        </div>
    );
}

export default ProfileInfo;