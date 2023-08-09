import { IStore } from '../types'

export const selectAbout = (store: IStore) => store.about
export const selectStandings = (store: IStore) => store.standings
export const selectApp = (store: IStore) => store.app
export const selectUser = (store: IStore) => store.user
export const selectAnswers = (store: IStore) => store.answers
export const selectResults = (store: IStore) => store.results
export const selectWeeks = (store: IStore) => store.weeks
export const selectCompare = (store: IStore) => store.compare
export const selectEditor = (store: IStore) => store.editor
export const selectLocation = (store: IStore) => store.router.location
export const selectTools = (store: IStore) => store.tools
