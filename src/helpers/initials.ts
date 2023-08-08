import { IUserStore, WeekType, QuestionType } from '../types'

export const initialUser: IUserStore = {
  name: '',
  locale: 'ru',
  admin: false,
  buddies: [],
  uid: ''
}

export const initialRedirects = ['/', '/userpage', '/week', 'season', '/standings', '/calendar', '/editor']

export const emptyWeek: WeekType = {
  questions: {},
  name: '',
  active: false,
  deadline: new Date().getTime()
}

export const emptyQuestion: QuestionType = {
  question: '',
  total: '',
  id: null
}
