import {AppStateType} from '../redux-store'
import {createSelector} from 'reselect'

// State
const getMessage = (state: AppStateType) => state.dialogsPage

// Selector
export const getMessageSelector = createSelector(getMessage, (getMessage) => getMessage)