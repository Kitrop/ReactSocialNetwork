import {Field, Formik} from "formik";
import message from "./Dialogs.module.css";
import * as Yup from "yup";


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
            .min(1, 'Too Short!')
            .max(105, 'Too Long!')
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