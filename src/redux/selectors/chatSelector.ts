import {AppStateType} from '../redux-store'
import {createSelector} from 'reselect'

// State
const getMessages = (state: AppStateType) => state.chat.messages
const getStatus = (state: AppStateType) => state.chat.status

// Selectors
export const getMessagesSelector = createSelector(getMessages, (getMessages) => getMessages)
export const getStatusSelector = createSelector(getStatus, (getStatus) => getStatus)