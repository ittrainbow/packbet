import { IStore } from '../types'

export const selectAbout = (store: IStore) => store.about
export const selectStandings = (store: IStore) => store.standings
export const selectApp = (store: IStore) => store.app
export const selectUser = (store: IStore) => store.user
export const selectRouter = (store: IStore) => store.router
