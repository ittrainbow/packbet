import { WeekType } from './types'

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
  email: string | null
  adminAsPlayer?: boolean
}

export interface IAbout {
  [key: string]: { [key: number]: string }
}

export interface IEditorContext extends WeekType { }

export interface Answers {
  [key: number]: { [key: number]: number }
}

export interface IAnswersContext {
  [key: string]: Answers
}

export interface IUserListContext {
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
