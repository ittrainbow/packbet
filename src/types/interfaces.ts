import { Answers, Question, Week } from './types'

export interface App {
  season: number
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

export interface Tools {
  showTools: boolean
  showBuddies: boolean
  showOneWeek: boolean
  standingsSearch: string
}

export interface User {
  admin: boolean
  locale: 'ru' | 'ua'
  name: string
  adminAsPlayer?: boolean
  buddies: string[]
}

export interface UserStore extends User {
  uid: string
}

export interface About {
  [key: string]: {
    [key: number]: string
  }
}

export interface AnswersStore {
  [key: string]: Answers
}

export interface Players {
  [key: string]: User
}

// export interface Weeks {
//   [key: number]: Week
// }

export interface UserStandings {
  ansCorrect: number
  ansTotal: number
  resultsTotal: number
  name: string
  position: number | string
  correct: number
  uid: string
  faults: number
}

export interface Standings {
  week: UserStandings[]
  season: UserStandings[]
}

export interface Editor extends Week {
  questionInWork: Question
  questionCompare: Question
}
