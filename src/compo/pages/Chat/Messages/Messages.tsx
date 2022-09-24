import Message from './Message'
import {FC, memo, useEffect, useRef} from 'react'
import {ChatMessageAPI} from '../../../../redux/types/type'


interface Props {
    messages: ChatMessageAPI[]
}


const Messages: FC<Props> = memo(({messages}) => {

    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView(true);
    }, [messages]);
    console.log(messages)
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {/*@ts-ignore*/}
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
})


export default Messages