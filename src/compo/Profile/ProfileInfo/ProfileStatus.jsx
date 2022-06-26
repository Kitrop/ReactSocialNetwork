import i from './ProfileInfo.module.css';
import {useState} from "react";

const ProfileStatus = (props) => {

    let [status, setStatus] = useState(' Ты большой молодец, что дошел до этого момента')
    let [toggleView, setToggleView] = useState(true)

    const keyPressStatus = (event) => {
        if (event.key === 'Enter') {
            setToggleView(true)
        }
    }
    const changeStatus = (event) => {
        if (event.currentTarget.value != '') {
            setStatus(event.currentTarget.value)
        }
    }

    return (
        <div>
            {toggleView ?
            <span onDoubleClick={ () => {setToggleView(false)} } className={i.info_profile}>Status:
                <span className={i.desc_txt}>
                    {status}
                </span>
            </span>
                :
            <div>
                <input type={"text"} autoFocus={true} value={status} onBlur={() => { setToggleView(true)} } onKeyPress={ keyPressStatus } onChange={ changeStatus }/>
            </div>
            }
        </div>
    )
}

export default ProfileStatus;