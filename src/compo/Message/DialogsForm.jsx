import {Field, Formik} from "formik";
import message from "./Dialogs.module.css";


const DialogForm = (props) => {

    const initialValues = {
        messageText: ''
    }
    let onSubmit =  (values, { setSubmitting }) => {
        setTimeout(() => {
            alert('!!!!')
            props.SendMessageActionCreater(values.messageText)
            setSubmitting(false);
        }, 400);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
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