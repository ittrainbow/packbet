import { Week } from './types'

export interface IAppContext {
  about: string
  alert: boolean
  currentWeek: number
  emptyEditor: boolean
  isItYou: boolean
  nextWeek: number | null
  otherUserName: string
  otherUserUID: string
  season: number
  selectedWeek: number
  tabActive: number
}

export interface IUser {
  admin: boolean
  locale: string
  name: string
  email: string
}

export interface IUserContext extends IUser {
  adminAsPlayer: boolean
  tempLocale?: string
  tempName?: string
}

export interface IAboutContext {
  [key: string]: { [key: number]: string }
}

export interface IAnswersContext {
  [key: string]: { [key: number]: { [key: number]: number } }
}

export interface IUserListContext {
  [key: string]: IUser
}

export interface IWeeksContext {
  [key: number]: Week
}

export interface IUserStandings {
  ansCorrect: number
  ansTotal: number
  resultsTotal: number
  name: string
  position: number
  uid: string
}
