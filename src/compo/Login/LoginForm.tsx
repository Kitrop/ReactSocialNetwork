import {Field, Formik} from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import {FC} from "react";
import {FormikErrors, FormikValues} from "formik/dist/types";

const Error = styled.div`
  color: red;
  font-size: 18px;
  font-style: italic;
`

type Props = {
    loginThunk: (email: string, password: number, rememberMe: boolean, captcha: any) => void
    captchaUrl: string | null
}

export const LoginForm: FC<Props> = ({loginThunk, captchaUrl}) => {

    type InitialValuesType = {
        email: string | null
        password: number | null
        rememberMe: boolean
        captcha: string
    }

    let initialValues: InitialValuesType = {
        email: '',
        password: null,
        rememberMe: false,
        captcha: ''
    }
    let SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });
    let validateValues = (values: FormikValues) => {
        const errors: FormikErrors<FormikValues> = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    }
    let submitCallback =  (values: FormikValues, setSubmitting: any) => {
        setTimeout(() => {
            loginThunk(values.email, values.password, values.rememberMe, values.captcha);
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
                        <Field type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                    </div>
                    <Error> {errors.email && touched.email && errors.email} </Error>
                    <div>
                        <label htmlFor={'password'}>Password</label>
                        <Field type="password" name="password" onChange={handleChange} onBlur={handleBlur}  value={values.password} />
                    </div>
                    <Error>{errors.password && touched.password && errors.password}</Error>
                    <div>
                        <label htmlFor={'rememberMe'}> Remember me</label>
                        <Field type="checkbox" name={"rememberMe"} onChange={handleChange}/>
                    </div>
                    {captchaUrl && <div> <img src={captchaUrl} alt={'captcha security'}/> </div>}
                    {captchaUrl && <div> <input name={'captcha'} value={values.captcha} onBlur={handleBlur} type={'text'} onChange={handleChange} /> </div>}
                    <div>
                        <button type="submit" disabled={isSubmitting}> Submit </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

