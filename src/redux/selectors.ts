import { Store } from '../types'

export const selectAbout = (store: Store) => store.about
export const selectStandings = (store: Store) => store.standings
export const selectApp = (store: Store) => store.app
export const selectUser = (store: Store) => store.user
export const selectAnswers = (store: Store) => store.answers
export const selectResults = (store: Store) => store.results
export const selectWeeks = (store: Store) => store.weeks
export const selectCompare = (store: Store) => store.compare
export const selectEditor = (store: Store) => store.editor
export const selectLocation = (store: Store) => store.router.location
export const selectTools = (store: Store) => store.tools
