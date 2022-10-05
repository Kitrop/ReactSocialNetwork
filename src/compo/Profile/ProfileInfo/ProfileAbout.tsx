import {ProfileType} from '../../../redux/types/type'
import {FC} from 'react'
import i from './ProfileInfo.module.css'


const ProfileAbout: FC<Props> = ({profile}) => {

    return (
        <>
            {/*Job*/}
            <div>
                <div className={i.info_profile}>looking for a job: {profile.lookingForAJob
                    ? <span className={i.looking_for_job_true}> ✓ </span>
                    : <span className={i.looking_for_job_false}> ✖ </span>
                } </div>
                <div>
                </div>
                <div className={i.info_profile}>Job Description: <span>{profile.lookingForAJobDescription !== null ? profile.lookingForAJobDescription : 'No'}</span></div>
            </div>
            {/*Contacts*/}
            <div>

            </div>
        </>
    )
}

export default ProfileAbout


interface Props  {
    profile: ProfileType
}