import i from '../ProfileInfo.module.css'
import {FC, useState} from 'react'
import {ProfileType} from '../../../../redux/types/type'
import {Field, Formik} from 'formik'
import {FormikValues} from 'formik/dist/types'
import { Button } from '@mui/material'

type Props = {
    profile: ProfileType
    putProfileInfo: (profile: ProfileType) => void
    isOwner: boolean
}

const ProfileAboutForm: FC<Props> = ({profile, putProfileInfo, isOwner}) => {
    const initialValues = JSON.parse(JSON.stringify(profile))
    const contactsArray = Object.keys(profile.contacts)
    const submitCallback = (values: FormikValues, {setSubmitting}: {setSubmitting: (arg1: boolean) => void}) => {
        putProfileInfo(profile)
        setSubmitting(false)
    }
    const [editMode, setEditMode] = useState(false)

    // @ts-ignore
    return (
        <>
            {editMode
                ? <Formik initialValues={initialValues} onSubmit={submitCallback}>
                    {({
                          handleSubmit,
                          isSubmitting
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field as={'textarea'} name={'lookingForAJobDescription'} placeholder={'My professional skills'}/>
                            </div>
                            <button type={'submit'} disabled={isSubmitting} > Save </button>
                        </form>
                    )}
                </Formik>
                : <div>
                    <div className={i.info_profile}>looking for a job: {profile.lookingForAJob
                        ? <span className={i.looking_for_job_true}> ✓ </span>
                        : <span className={i.looking_for_job_false}> ✖ </span>
                    } </div>
                    <div>
                    </div>
                    <div className={i.info_profile}>Job Description: <span>{profile.lookingForAJobDescription !== null ? profile.lookingForAJobDescription : 'No'}</span></div>
                </div>
            }
            {isOwner ? <Button color={'inherit'} variant="contained" size={'small'} onClick={() => setEditMode(true)}> Edit </Button> : null}

        </>
    )
}

export default ProfileAboutForm