import i from '../ProfileInfo.module.css'
import cn from 'classnames';
import {useState} from 'react'

const Contacts = (props) => {


    let [toggleView, setToggleView] = useState(true)

    let [editModeVk, setEditModeVk] = useState(true)
    let [editModeGithub, setEditModeGithub] = useState(true)
    let [editModeMainLink, setEditModeMainLink] = useState(true)
    let [editModeFacebook, setEditModeFacebook] = useState(true)

    return (
        <div>
            <span className={cn(i.info_profile, i.my_contacts)} onDoubleClick={() => setToggleView(true)} onClick={() => setToggleView(false)}>My contacts {toggleView ? '▼' : '▲'}</span>
            {toggleView
                ? <span> </span>
                : <div className={i.contact}>
                    <div onDoubleClick={() => setEditModeVk(false)}>
                        vk:{editModeVk ? <span className={i.contact}>{props.vk}</span> : <input type={"text"} autoFocus={true} value={props.vk} className={i.contact}/>}
                    </div>
                    <div onDoubleClick={() => setEditModeGithub(false)}>
                        github:{editModeGithub ? <span className={i.contact}>{props.vk}</span> : <input type={"text"} autoFocus={true} value={props.github} className={i.contact}/>}
                    </div>
                    <div onDoubleClick={() => setEditModeMainLink(false)}>
                        mainLink:{editModeMainLink ? <span className={i.contact}>{props.vk}</span> : <input type={"text"} autoFocus={true} value={props.mainLink} className={i.contact}/>}
                    </div>
                    <div onDoubleClick={() => setEditModeFacebook(false)}>
                        facebook:{editModeFacebook ? <span className={i.contact}>{props.vk}</span> : <input type={"text"} autoFocus={true} value={props.facebook} className={i.contact}/>}
                    </div>
                </div>}
            {/*<div className={i.info_profile}>My contacts: <span className={i.desc_txt}>{props.facebook !== null ? props.facebook : 'Anonymous'}</span></div>*/}
        </div>
    )
}

export default Contacts