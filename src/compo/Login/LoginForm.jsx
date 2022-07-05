import {Formik} from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

const Error = styled.div`
  color: red;
  font-size: 18px;
  font-style: italic;
`

export const LoginForm = (props) => {

    let initialValues = {
        email: '',
        password: '',
        remember: ''
    }
    let SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });
    let validateValues = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    }
    let submitCallback =  (values, { setSubmitting }) => {
        setTimeout(() => {
            props.loginThunk(values.email, values.password, values.rememberMe);
            setSubmitting(false);
        }, 400);
    }

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={SignupSchema}
            validate={ validateValues }
            onSubmit={ submitCallback }
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor={'email'}>Login / Email</label>
                        <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                    </div>
                    <Error> {errors.email && touched.email && errors.email} </Error>
                    <div>
                        <label htmlFor={'password'}>Password</label>
                        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur}  value={values.password}/>
                    </div>
                    <Error>{errors.password && touched.password && errors.password}</Error>
                    <div>
                        <label htmlFor={'rememberMe'}> Remember me</label>
                        <input type="checkbox" name={"rememberMe"} onChange={handleChange}  value={values.rememberMe}/>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}> Submit< /button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

