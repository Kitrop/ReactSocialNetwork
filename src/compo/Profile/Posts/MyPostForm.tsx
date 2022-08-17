import posts from "./MyPosts.module.css";
import {Formik, Field} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {FC} from "react";
import {FormikErrors, FormikValues} from "formik/dist/types";



const Error = styled.div`
  color: red;
  font-size: 18px;
  font-style: italic;
`


// Types
type Props = {
    onAddPost: (value: string) => void
}
type InitialValue = {
    postText: string
}

// Form
const MyPostForm: FC<Props> = ({onAddPost}) => {

    let initialValues: InitialValue = {
        postText: ''
    }
    let SignupSchema = Yup.object().shape({
        postText: Yup.string()
            .min(2, 'Too Short!')
            .max(250, 'Too Long!')
    });
    let submitCallback =  (values: FormikValues,  setSubmitting: any) => {
        setTimeout(() => {
            onAddPost(values.postText)
            setSubmitting(false);
        }, 400);
    }
    let validateValues = (values: FormikValues) => {
        const errors: FormikErrors<FormikValues>  = {};
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