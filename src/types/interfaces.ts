import { WeekType, AnswersType, QuestionType } from './types'

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
  selectedWeek: number
  tabActive: number
  emailReg: boolean
  duration: number
}

export interface IRouter {
  location: {
    pathname: string
    search: string
    hash: string
    state: string | null
    key: string
  }
  action: 'PUSH' | 'PULL'
}

export interface ITools {
  showTools: boolean
  showBuddies: boolean
  showOneWeek: boolean
  standingsSearch: string
}

export interface IUser {
  admin: boolean
  locale: string
  name: string
  adminAsPlayer?: boolean
  buddies: string[]
}

export interface IUserStore extends IUser {
  uid: string
}

export interface IAbout {
  [key: string]: {
    [key: number]: string
  }
}

export interface IAnswers {
  [key: string]: AnswersType
}

export interface IPlayers {
  [key: string]: IUser
}

export interface IWeeks {
  [key: number]: WeekType
}

export interface IFetchObject<T> {
  [key: number | string]: T
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

export interface IStandings {
  [key: string]: IUserStandings[]
}

export interface IEditor extends WeekType {
  questionInWork: QuestionType
  questionCompare: QuestionType
}