import i from './ProfileInfo.module.css';
import {useState} from "react";


const ProfileStatus = (props) => {

    let [status, setStatus] = useState(props.status)
    let [toggleView, setToggleView] = useState(true)

    // при нажатии enter выкл. ред.
    const keyPressStatus = (event) => {
        if (event.key === 'Enter') {
            setToggleView(true)
            props.putProfileStatus(status)
        }
    }

    // устанавливает обновленный статус
    const changeStatus = (event) => {
        if (event.currentTarget.value !== ' ') {
            setStatus(event.currentTarget.value)
        }
    }

    // При выходе из фокуса выкл. ред.
    const onBlur = () => {
        setToggleView(true);
        props.putProfileStatus(status)
    }

    return (
        <div>
            {toggleView ?
            <span onDoubleClick={ () => {setToggleView(false)} } className={i.info_profile}>Status:
                <span className={i.desc_txt}  data-testid="status_span">
                    {status}
                </span>
            </span>
                :
            <div>
                <input data-testid="status_input" type={"text"} autoFocus={true} value={status} onBlur={ onBlur } onKeyPress={ keyPressStatus } onChange={ changeStatus }/>
            </div>
            }
        </div>
    )
}

export default ProfileStatus;