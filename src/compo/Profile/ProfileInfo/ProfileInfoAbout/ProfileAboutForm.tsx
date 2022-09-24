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
    const submitCallback = (values: FormikValues, {setSubmitting}: {setSubmitting: (arg1: boolean) => void}) => {
        putProfileInfo(profile)
        setSubmitting(false)
    }
    // const job = initialValues.fullName

    const [editMode, setEditMode] = useState(false)

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
                                {/*<label  htmlFor={'lookingForAJob'}>lookingForAJob:</label>*/}
                                {/*<Field as={'select'} name={'lookingForAJob'}>*/}
                                {/*    /!*@ts-ignore*!/*/}
                                {/*    <option value={true}>True</option>*/}
                                {/*    /!*@ts-ignore*!/*/}
                                {/*    <option value={false}>False</option>*/}
                                {/*</Field>*/}
                                <Field as={'textarea'} name={'lookingForAJobDescription'} placeholder={'My professional skills'}/>
                            </div>
                            <button type={'submit'} disabled={isSubmitting} > Save</button>
                        </form>
                    )}
                </Formik>
                : <div>
                    <div className={i.info_profile}>looking for a job: {profile.lookingForAJob
                        ? <span className={i.looking_for_job_true}> ✓ </span>
                        : <span className={i.looking_for_job_false}> ✖ </span>
                    } </div>
                    <div className={i.info_profile}>Job Description: <span>{profile.lookingForAJobDescription !== null ? profile.lookingForAJobDescription : 'No'}</span></div>
                </div>
            }
            {isOwner ? <Button color={'inherit'} variant="contained" size={'small'} onClick={() => setEditMode(true)}>Edit</Button> : null}

        </>
    )
}

export default ProfileAboutForm