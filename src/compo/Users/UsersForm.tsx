import {Field, Formik} from 'formik'
import * as Yup from 'yup'
import {FormikValues} from 'formik/dist/types'
import {FC} from 'react'
import {FilterType} from '../../redux/reducers/usersReducer'
import {Button, TextField} from '@mui/material'
import styles from './UsersForm.module.css'

// types
type InitialValues = {
    // isFriends: boolean
    term: string
    friend: boolean | null | string
}

type Props = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersForm: FC<Props> = ({onFilterChanged}) => {


    // InitialValues
    const initialValues: InitialValues = {
        term: '',
        friend: 'null'
    }

    // Error handling scheme
    let SignupSchema = Yup.object().shape({
        term: Yup.string()
            .min(2, 'Too Short!')
            .max(250, 'Too Long!')
    })

    // Triggered when clicked on find
    const submitCallback = (values: FormikValues,{setSubmitting}: {setSubmitting: (arg1: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        console.log(filter);
        onFilterChanged(filter)
        setSubmitting(false);
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={submitCallback}
                validationSchema={SignupSchema} >
            {({
                  values,
                  handleSubmit,
                  handleChange,
                  isSubmitting
              }) => (
                  <form onSubmit={handleSubmit}>
                      <div className={styles.form}>
                          <label htmlFor={'friend'}>Show</label>
                          <Field as={'select'} name={'friend'} className={styles.__select}>
                              <option className={styles.__select__label} value={'null'}> All </option>
                              <option className={styles.__select__label} value={'true'}> Only followed </option>
                              <option className={styles.__select__label} value={'false'}> Not followed </option>
                          </Field>
                      </div>
                      <div className={styles.form}>
                          <TextField fullWidth={false} id="filled-basic"  name="term" onChange={handleChange} value={values.term}  label="Search user" variant="filled" />
                      </div>
                      {/*Submit*/}
                      <div className={styles.formik}>
                          <Button type={'submit'} disabled={isSubmitting} variant="outlined"> Find </Button>
                      </div>
                  </form>
            )}
        </Formik>
    )
}

export default UsersForm
