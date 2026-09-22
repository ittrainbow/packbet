import { Store } from '@/types'

export function selectAbout(store: Store) {
  return store.about
}
export function selectStandings(store: Store) {
  return store.standings
}
export function selectApp(store: Store) {
  return store.app
}
export function selectUser(store: Store) {
  return store.user
}
export function selectAnswers(store: Store) {
  return store.answers
}
export function selectResults(store: Store) {
  return store.results
}
export function selectWeeks(store: Store) {
  return store.weeks
}
export function selectCompare(store: Store) {
  return store.compare
}
export function selectEditor(store: Store) {
  return store.editor
}
export function selectLocation(store: Store) {
  return store.router.location
}
export function selectTools(store: Store) {
  return store.tools
}
