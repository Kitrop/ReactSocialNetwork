import {Formik} from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'
import {FC} from 'react'
import {FormikErrors, FormikValues} from 'formik/dist/types'
import {Alert, Button, Checkbox, FormControlLabel, TextField} from '@mui/material'
import style from './Login.module.css'

type Props = {
    loginThunk: (email: string, password: number, rememberMe: boolean, captcha: any) => void
    captchaUrl: string | null
}
type InitialValuesType = {
    email: string | null
    password: number | null
    rememberMe: boolean
    captcha: string
}

export const LoginForm: FC<Props> = ({loginThunk, captchaUrl}) => {


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
    let submitCallback =  (values: FormikValues, {setSubmitting}: {setSubmitting: (arg1: boolean) => void}) => {
        loginThunk(values.email, values.password, values.rememberMe, values.captcha);
        setSubmitting(false);
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
                    {/*login*/}
                    <div className={style.form}>
                        <TextField type="email" id="outlined-basic"  name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}  label="Email/Login" variant="outlined" />
                        {errors.email != null ? <Alert className={style.formError} severity="error">  {errors.email && touched.email && errors.email} </Alert> : null}
                    </div>
                    {/*pass*/}
                    <div className={style.form}>
                        <TextField type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} label="Password" autoComplete="current-password" id="outlined-password-input"/>
                        {errors.password != null ? <Alert className={style.formError} severity="error"> {errors.password && touched.password && errors.password} </Alert> : null}
                    </div>
                    {/*remember me*/}
                    <div>
                        <FormControlLabel control={<Checkbox name={"rememberMe"} onChange={handleChange} defaultChecked/>} label={'Remember me'}/>
                    </div>
                    {captchaUrl && <div> <img src={captchaUrl} alt={'captcha security'}/> </div>}
                    {captchaUrl && <div> <input name={'captcha'} value={values.captcha} onBlur={handleBlur} type={'text'} onChange={handleChange} /> </div>}
                    {/*submit*/}
                    <div>
                        <Button type="submit" disabled={isSubmitting} variant="contained" color="success"> Submit </Button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

