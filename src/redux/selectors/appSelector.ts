import {AppStateType} from "../redux-store";
import {createSelector} from 'reselect'

// State
export const getInitialized = (state: AppStateType) => state.app.initialized

// Selector
export const  getInitializedSelector = createSelector(getInitialized, (getInitialized) => getInitialized)