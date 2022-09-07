import i from './ProfileInfo.module.css'
import {FC, FormEvent, SyntheticEvent, useState} from 'react'


type Props = {
    putProfileStatus: (status: string) => void
    isOwner: boolean
    statusProps: string
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

const ProfileStatus: FC<Props> = ({statusProps, isOwner, putProfileStatus}) => {

    let [status, setStatus] = useState(statusProps)
    let [toggleView, setToggleView] = useState(true)

    // при нажатии enter выкл. ред.
    const keyPressStatus = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setToggleView(true)
            putProfileStatus(status)
        }
    }

    // устанавливает обновленный статус
    const changeStatus = (event: FormEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value)
    }


    // При выходе из фокуса выкл. ред.
    const onBlur = () => {
        setToggleView(true);
        putProfileStatus(status)
    }

    // режим редактирования
    const editMode = () => {
        if (isOwner) {
            setToggleView(false)
        }
    }

    return (
        <div>
            {toggleView ?
            <span onDoubleClick={editMode} className={i.info_profile}>Status:
                <span className={i.desc_txt}  data-testid="status_span">
                    {statusProps}
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