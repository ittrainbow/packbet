import { WeekType, AnswersType } from './types'

export interface IApp {
  mobile: boolean
  loading: boolean
  editor: boolean
  error: string
  currentWeek: number
  emptyEditor: boolean
  isItYou: boolean
  nextWeek: number
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
  adminAsPlayer?: boolean
}
export interface RawUser extends IUser { email: string }

export interface IAbout {
  [key: string]: { [key: number]: string }
}

export interface IAnswers {
  [key: string]: AnswersType
}

export interface IEditorContext extends WeekType { }

export interface ICompareContext {
  [key: string]: AnswersType
}

export interface IPlayers {
  [key: string]: IUser
}

export interface IWeeksContext {
  [key: number]: WeekType
}

export interface IUserStandings {
  ansCorrect: number
  ansTotal: number
  resultsTotal: number
  name: string
  position: number | string
  correct: number
  uid: string
}
