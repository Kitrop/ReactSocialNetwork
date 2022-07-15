import i from '../ProfileInfo.module.css'

const Job = (props) => {
    return (
        <div>
            <div className={i.info_profile}>looking for a job: {props.lookingForAJob
                ? <span className={i.looking_for_job_true}> ✓ </span>
                : <span className={i.looking_for_job_false}> ✖ </span>
            } </div>
            <div className={i.info_profile}>Job Description: <span>{props.lookingForAJobDescription !== null ? props.lookingForAJobDescription : 'No'}</span></div>
        </div>
    )
}

export default Job