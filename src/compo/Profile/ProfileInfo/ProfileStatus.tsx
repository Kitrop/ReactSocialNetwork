import i from './ProfileInfo.module.css';
import {FC, FormEvent, SyntheticEvent, useEffect, useState} from 'react'


type Props = {
    putProfileStatus: (status: string) => void
    isOwner: boolean
    status: string
}
interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    /** @deprecated */
    charCode: number;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    key: string;
    /** @deprecated */
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    /** @deprecated */
    which: number;
}

const ProfileStatus: FC<Props> = (props) => {

    let [status, setStatus] = useState(props.status)
    let [toggleView, setToggleView] = useState(true)

    // при нажатии enter выкл. ред.
    const keyPressStatus = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setToggleView(true)
            props.putProfileStatus(status)
        }
    }

    // устанавливает обновленный статус
    const changeStatus = (event: FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.value !== ' ') {
            setStatus(event.currentTarget.value)
        }
    }

    // При выходе из фокуса выкл. ред.
    const onBlur = () => {
        setToggleView(true);
        props.putProfileStatus(status)
    }

    const editMode = () => {
        if (props.isOwner) {
            setToggleView(false)
        }
    }

    useEffect(() => {
        props.putProfileStatus(status)
    }, [props.putProfileStatus, status])

    return (
        <div>
            {toggleView ?
            <span onDoubleClick={editMode} className={i.info_profile}>Status:
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