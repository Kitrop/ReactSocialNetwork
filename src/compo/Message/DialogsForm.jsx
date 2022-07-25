import {Field, Formik} from "formik";
import message from "./Dialogs.module.css";
import * as Yup from "yup";
import styled from 'styled-components'

const Error = styled.div`
  color: red;
  font-size: 18px;
  font-style: italic;
`


const DialogForm = (props) => {
    const initialValues = {
        messageText: ''
    }
    let onSubmit =  (values, { setSubmitting }) => {
        setTimeout(() => {
            console.log(values.messageText)
            props.SendMessageActionCreater(values.messageText)
            setSubmitting(false);
        }, 400);
    }
    let SignupSchema = Yup.object().shape({
        messageText: Yup.string()
            .min(3, 'Too Short!')
            .max(105, 'Too Long!')
            .required('Required'),
    });
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema = {SignupSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field type="text" name={'messageText'} placeholder={'type your message'}  onChange={handleChange} onBlur={handleBlur} value={values.messageText}/>
                        <Error>{errors.messageText && touched.messageText && errors.messageText}</Error>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className={message.mybutton} >Send Message</button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default DialogForm;