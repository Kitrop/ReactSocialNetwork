import i from './ProfileInfo.module.css'
import Preloader from '../../Preloader/Preloader'
import userPhoto from '../../../img/avatar.jpg'
import ProfileStatus from './ProfileStatus'
import Job from './ProfileInfoAbout/Job'
import Contacts from './ProfileInfoAbout/Contacts'
import {putProfileJob} from '../../../redux/reducers/profileReducer'


function ProfileInfo(props) {
    if(!props.profile) {
        return <Preloader />
    }

    const onAvatarSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={i.descriptionBlock}>
                {/*FullName*/}
                <div className={i.info_profile}>{props.profile.fullName}</div>
                {/*Photos*/}
                <img className={i.profile_avatar} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} alt={'avatar'}/>
                {props.isOwner && <input type={'file'} onChange={onAvatarSelected}/>}
                {/*Status*/}
                <ProfileStatus status={props.status} putProfileStatus={props.putProfileStatus}/>
                {/*MyContacts*/}
                <Contacts putProfileContacts={props.putProfileContacts} github={props.profile.contacts.github} vk={props.profile.contacts.vk} facebook={props.profile.contacts.facebook} instagram={props.profile.contacts.instagram} twitter={props.profile.contacts.twitter} website={props.profile.contacts.website} youtube={props.profile.contacts.youtube} mainLink={props.profile.contacts.mainLink}/>
                {/*Job*/}
                <Job putProfileJob={props.putProfileJob} lookingForAJob={props.profile.lookingForAJob} lookingForAJobDescription={props.profile.lookingForAJobDescription}/>
            </div>
        </div>
    );
}

export default ProfileInfo;