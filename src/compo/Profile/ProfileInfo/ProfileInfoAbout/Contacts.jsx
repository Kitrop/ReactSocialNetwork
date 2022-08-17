import i from '../ProfileInfo.module.css'
import cn from 'classnames';
import {useState} from 'react'
import * as Yup from 'yup';
import {Formik} from 'formik';
import styled from 'styled-components'


const Error = styled.div`
  color: red;
  font-size: 18px;
  font-style: italic;
`

const Contacts = (props) => {


    let [toggleView, setToggleView] = useState(true)
    let [editModeVk, setEditModeVk] = useState(true)
    let [editModeGithub, setEditModeGithub] = useState(true)
    let [editModeMainLink, setEditModeMainLink] = useState(true)
    let [editModeFacebook, setEditModeFacebook] = useState(true)

    let initialValues = {
        vk: '',
        github: '',
        mainLink: '',
        facebook: ''
    }
    let SignupSchema = Yup.object().shape({
        vk: Yup.string()
            .max(40, 'Too Long!'),
        github: Yup.string()
            .max(40, 'Too Long!'),
        mainLink: Yup.string()
            .max(40, 'Too Long!'),
        facebook: Yup.string()
            .max(40, 'Too Long!'),
    });
    let submitCallback =  (values, { setSubmitting }) => {
        setTimeout(() => {
            props.putProfileContacts(values.vk, values.github, values.mainLink, values.facebook);
            setSubmitting(false);
        }, 400);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={submitCallback}>
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
                <span className={cn(i.info_profile, i.my_contacts)} onDoubleClick={() => setToggleView(true)} onClick={() => setToggleView(false)}> My contacts {toggleView ? '▼' : '▲'} </span>
                {toggleView
                    ? <span> </span>
                    : <div className={i.contact}>

                        {/*VK*/}
                        <div onDoubleClick={() => setEditModeVk(false)}>
                            vk:{ editModeVk
                            ? <span className={i.contact}>{props.vk}</span>
                            : <input name={'vk'} type={'text'} autoFocus={true} onChange={handleChange} onBlur={handleBlur} value={values.vk} className={i.contact}/>}
                        </div>
                        <Error> {errors.vk && touched.vk && errors.vk} </Error>

                        {/*GITHUB*/}
                        <div onDoubleClick={() => setEditModeGithub(false)}>
                            github:{ editModeGithub
                            ? <span className={i.contact}>{props.github}</span>
                            : <input name={'github'} type={'text'} autoFocus={true} onChange={handleChange} onBlur={handleBlur} value={values.github} className={i.contact}/>}
                        </div>
                        <Error> {errors.github && touched.github && errors.github} </Error>

                        {/*MAINLINK*/}
                        <div onDoubleClick={() => setEditModeMainLink(false)}>
                            mainLink:{ editModeMainLink
                            ? <span className={i.contact}>{props.mainLink}</span>
                            : <input name={'mainLink'} type={'text'} autoFocus={true} onChange={handleChange} onBlur={handleBlur} value={values.mainLink} className={i.contact}/>}
                        </div>
                        <Error> {errors.mainLink && touched.mainLink && errors.mainLink} </Error>

                        {/*FACEBOOK*/}
                        <div onDoubleClick={() => setEditModeFacebook(false)}>
                            facebook:{ editModeFacebook
                            ? <span className={i.contact}>{props.facebook}</span>
                            : <input name={'facebook'} type={'text'} autoFocus={true} onChange={handleChange} onBlur={handleBlur} value={values.facebook} className={i.contact}/>}
                        </div>
                        <Error> {errors.facebook && touched.facebook && errors.facebook} </Error>

                        {/*BUTTON SUBMIT*/}
                        <div>
                            <button type="submit" disabled={isSubmitting} value={'submit'}/>
                        </div>
                    </div>}
            </form> )}
        </Formik>
    )
}

export default Contacts