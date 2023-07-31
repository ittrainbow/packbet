import { StoreType } from '../types'

export const selectAbout = (store: StoreType) => store.about
export const selectApp = (store: StoreType) => store.app
export const selectRouter = (store: StoreType) => store.router
