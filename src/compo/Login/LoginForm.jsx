import { Formik } from 'formik';

export const LoginForm = (props) => {

    let initialValues = {
        email: '',
        password: ''
    }
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
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }

    return (
        <Formik
            initialValues={ initialValues }
            validate={ validateValues }
            onSubmit={ submitCallback } >
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
                    {errors.email && touched.email && errors.email}

                    <div>
                        <label htmlFor={'password'}>Password</label>
                        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur}  value={values.password}/>
                    </div>
                    {errors.password && touched.password && errors.password}
                    <div>
                        <label htmlFor={'rememberMe'}> Remember me</label>
                        <input type="checkbox" name={"rememberMe"} onChange={handleChange}  value={values.rememberMe}/>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

