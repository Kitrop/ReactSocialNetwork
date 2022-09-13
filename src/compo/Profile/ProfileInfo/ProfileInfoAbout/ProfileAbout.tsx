import {FC} from 'react'
import {ProfileType} from '../../../../redux/types/type'
import i from '../ProfileInfo.module.css'

type Props = {
    profile: ProfileType
}



const ProfileAbout: FC<Props> = ({profile}) => {
    return (
        <div>
            <div className={i.info_profile}>looking for a job: {profile.lookingForAJob
                ? <span className={i.looking_for_job_true}> ✓ </span>
                : <span className={i.looking_for_job_false}> ✖ </span>
            } </div>
            <div className={i.info_profile}>Job Description: <span>{profile.lookingForAJobDescription !== null ? profile.lookingForAJobDescription : 'No'}</span></div>
        </div>
    )
}

export default ProfileAbout;