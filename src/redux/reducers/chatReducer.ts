// @ts-ignore

import {ChatMessageAPI, StatusMessage} from '../types/type'
import {AppStateType, InferActionsTypes} from '../redux-store'
import {ThunkDispatch} from 'redux-thunk'
import {chatApi} from '../../api/chatApi'
import {Dispatch} from 'redux'
import uniqid from 'uniqid'




// State
const initialState = {
    messages: [] as ChatMessage[],
    status: 'pending' as StatusMessage
}
export type InitialStateType = typeof initialState



// Reducer
const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_MESSAGES': {
            return {...state, messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: uniqid()}) )]
                    .filter((m, index, array) => index >= array.length - 40) }
        }
        case 'SET_STATUS_CHAT': {
            return {...state, status: action.payload.status}
        }
        default: {
            return state
        }
    }
}


// ActionCreator
export const chatAction = {
    setMessages: (messages: ChatMessageAPI[]) => ({type: 'SET_MESSAGES', payload: {messages} } as const),
    setStatus: (status: StatusMessage) => ({type: 'SET_STATUS_CHAT', payload: {status}} as const),
}


// MessageHandler
let _newMessageHandler: ((messages: ChatMessageAPI[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatAction.setMessages(messages))
        }
    }
    return _newMessageHandler
}

// StatusHandler
let _newStatusHandler: ((status: StatusMessage) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(chatAction.setStatus(status))
        }
    }
    return _newStatusHandler
}

// ThunkCreator
export const startMessagesListening = () => async (dispatch: DispatchThunkType) => {
    chatApi.startChannel()
    await chatApi.subscribe('getMessage', newMessageHandlerCreator(dispatch) )
    await chatApi.subscribe('statusChanged', newStatusHandlerCreator(dispatch) )
}
export const stopMessagesListening = () => async (dispatch: DispatchThunkType) => {
    await chatApi.unsubscribe('getMessage', newMessageHandlerCreator(dispatch) )
    chatApi.unsubscribe('statusChanged', newStatusHandlerCreator(dispatch))
    chatApi.stopChannel()
}
export const sendMessage = (message: string) => () => {
    chatApi.sendMessage(message)
}


export  default chatReducer;



// Types
export type ActionsType = InferActionsTypes<typeof chatAction>
type DispatchThunkType = ThunkDispatch<AppStateType, unknown, ActionsType>
type ChatMessage = ChatMessageAPI & {id: string}