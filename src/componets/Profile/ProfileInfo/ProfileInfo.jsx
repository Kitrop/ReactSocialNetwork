import i from './ProfileInfo.module.css';
import Preloader from "../../preloader/Preloader";
import userPhoto from "../../../img/avatar.jpg";

function ProfileInfo(props) {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img className={i.bg_image}
                     src={"https://flytothesky.ru/wp-content/uploads/2012/10/midnight-sun-in-lofoten-norway.jpg"} alt={'img'}/>
            </div>
            <div className={i.descriptionBlock}>
                <div className={i.info_profile}>{props.profile.fullName}</div>
                <img className={i.profile_avatar} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} alt={'avatar'} />
                <div className={i.info_profile}>About me: <span className={i.desc_txt}>{props.profile.aboutMe}</span> </div>
                <div className={i.info_profile}>Job: <span className={i.desc_txt}>{props.profile.lookingForAJobDescription}</span> </div>
                <div className={i.info_profile}>My contacts: <span className={i.desc_txt}>{props.profile.contacts.vk}</span> </div>
                <div className={i.info_profile}>looking for a job: {props.profile.lookingForAJob
                    ? <span className={i.looking_for_job_true}> ✓ </span>
                    :<span className={i.looking_for_job_false}> ✖ </span>
                } </div>
            </div>
        </div>
    );
}

export default ProfileInfo;