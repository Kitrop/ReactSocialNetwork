import i from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../img/avatar.jpg'
import ProfileStatus from './ProfileStatus'
import Job from './ProfileInfoAbout/Job'
import Contacts from './ProfileInfoAbout/Contacts'
import {FC, SyntheticEvent} from "react";
import {bool} from "yup";
import {PhotosType, ProfileType} from "../../../redux/types/type";


type Props = {
    savePhoto: (photos: PhotosType) => void
    isOwner: boolean
    profile: any
    status: string
    putProfileStatus: (status: string) => void
    putProfileInfo: (profile: ProfileType) => void
}

const ProfileInfo: FC<Props> = ({savePhoto, isOwner, profile, status, putProfileStatus, putProfileInfo}) => {
    if(!profile) {
        return <Preloader />
    }

    const onAvatarSelected = (e: any) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
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
                <ProfileStatus isOwner={isOwner} status={status} putProfileStatus={putProfileStatus}/>
                {/*MyContacts*/}
                <Contacts  github={profile.contacts.github} vk={profile.contacts.vk} facebook={profile.contacts.facebook} instagram={profile.contacts.instagram} twitter={profile.contacts.twitter} website={profile.contacts.website} youtube={profile.contacts.youtube} mainLink={profile.contacts.mainLink}/>
                {/*Job*/}
                <Job lookingForAJob={profile.lookingForAJob} lookingForAJobDescription={profile.lookingForAJobDescription}/>
            </div>
        </div>
    );
}

export default ProfileInfo;