import {ChatMessageAPI, StatusMessage} from '../redux/types/type'

// Create subscriber
let subscribers = {
    'getMessage': [] as SubscribeMessage[],
    'statusChanged': [] as SubscribeStatus[]
}

//// HANDLER
// Open ws when ws disconnected
let webSocket: WebSocket
const closeHandler = () => {
    console.log('CLOSE WS')
    notifySubscribersStatus('pending')
    setTimeout(() => createChannel(), 5000)
}

// openHandler
const openHandler = () => {
    console.log('WS OPEN')
    notifySubscribersStatus('ready')
}

const errorHandler = () => {
    console.log('WS ERROR')
    notifySubscribersStatus('error')
}

// Get new message
const handlerMessage = (e: any) => {
    const newMessage = JSON.parse(e.data)
    subscribers.getMessage.forEach(s => s(newMessage))
}
////

// Get new status
const handlerStatus = (e: any) => {
    const newStatus = JSON.parse(e.data)
    subscribers.statusChanged.forEach(s => s(newStatus))
}


// Set subscribers status
const notifySubscribersStatus = (status: StatusMessage) => {
    subscribers.statusChanged.forEach(s => s(status))
}



// Create websocket channel
const createChannel = () => {
    clenup()
    webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx\n')
    notifySubscribersStatus('pending')
    webSocket.addEventListener('close', closeHandler)
    webSocket.addEventListener('message', handlerMessage)
    webSocket.addEventListener('status', handlerStatus)
    webSocket.addEventListener('open', openHandler)
    webSocket.addEventListener('error', errorHandler)
}


const clenup = () => {
    webSocket?.removeEventListener('close', closeHandler)
    webSocket?.removeEventListener('message', handlerMessage)
    webSocket?.removeEventListener('status', handlerStatus)
    webSocket?.close()
}


// Api
export const chatApi = {
    // open channel
    startChannel() {
        createChannel()
    },
    // stop channel
    stopChannel() {
        subscribers.getMessage = []
        subscribers.statusChanged = []
        clenup()
    },
    subscribe(events: EventsNames, callback: SubscribeMessage | SubscribeStatus) {
        // @ts-ignore
        subscribers[events].push(callback)
        return () => {
            // @ts-ignore
            subscribers.getMessage = subscribers[events].filter(s => s !== callback)
        }
    },
    unsubscribe(events: EventsNames, callback: SubscribeMessage | StatusChangedSubscriberType ) {
        // @ts-ignore
        subcribers[events] = subcribers[events].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        webSocket?.send(message)
    }
}


// Types
type SubscribeMessage = (messages: ChatMessageAPI[]) => void
type SubscribeStatus = (status: StatusMessage) => void
type StatusChangedSubscriberType = (status: StatusMessage) => void
type EventsNames = 'getMessage' | 'statusChanged'