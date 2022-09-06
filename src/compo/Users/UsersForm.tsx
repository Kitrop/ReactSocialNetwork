import {Field, Formik} from 'formik'
import * as Yup from 'yup'
import {FormikValues} from 'formik/dist/types'
import {FC} from 'react'
import {FilterType} from '../../redux/reducers/usersReducer'


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
                validationSchema={SignupSchema}>
            {({
                  values,
                  handleSubmit,
                  isSubmitting
              }) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor={'friend'}>Show</label>
                          <Field as={'select'} name={'friend'}>
                              <option value={undefined}> all </option>
                              <option value={'true'}> only friends </option>
                              <option value={'false'}> no friends </option>
                          </Field>
                      </div>
                      <div>
                          <label htmlFor={'searchUserName'}>Search user</label>
                          <Field type={'text'} name={'term'} value={values.term}  placeholder={'Search user'}/>
                      </div>
                      {/*Submit*/}
                      <button type={'submit'} disabled={isSubmitting} > Find </button>
                  </form>
            )}
        </Formik>
    )
}

export default UsersForm
