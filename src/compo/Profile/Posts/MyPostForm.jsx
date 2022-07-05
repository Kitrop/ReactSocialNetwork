import posts from "./MyPosts.module.css";
import {Formik, Field} from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const Error = styled.div`
  color: red;
  font-size: 18px;
  font-style: italic;
`

const MyPostForm = (props) => {

    let initialValues = {
        postText: ''
    }
    let SignupSchema = Yup.object().shape({
        postText: Yup.string()
            .min(2, 'Too Short!')
            .max(250, 'Too Long!')
    });
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
            initialValues = {initialValues}
            validationSchema = {SignupSchema}
            validateValues = {validateValues}
            onSubmit = {submitCallback}>
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
                    <Error>{errors.postText && touched.postText && errors.postText}</Error>
                    <div>
                        <button type="submit" className={posts.mybutton} disabled={isSubmitting}>Add post</button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default MyPostForm