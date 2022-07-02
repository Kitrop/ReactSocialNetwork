import posts from "./MyPosts.module.css";
import {Formik, Field} from "formik";

const MyPostForm = (props) => {

    let initialValues = {
        postText: ''
    }

    let submitCallback =  (values, { setSubmitting }) => {
        setTimeout(() => {
            props.onAddPost(values.postText)
            setSubmitting(false);
        }, 400);
    }

    let validateValues = values => {
        const errors = {};
        if (!values.postText) {
            errors.postText = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.postText)
        ) {
            errors.postText = 'Invalid PostText address';
        }
        return errors;
    }

    return (
        <Formik
            initialValues={initialValues}
            validateValues={validateValues}
            onSubmit={submitCallback}>
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
                        <Field type={'text'} name={'postText'} placeholder={'Your post text'} className={posts.textarea} onChange={handleChange} onBlur={handleBlur} value={values.postText}/>
                    </div>
                    {errors.postText && touched.postText && errors.postText}
                    <div>
                        <button type="submit" className={posts.mybutton} disabled={isSubmitting}>Add post</button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default MyPostForm