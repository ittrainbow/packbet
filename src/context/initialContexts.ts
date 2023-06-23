import { IAppContext, IUserContext, WeekType } from "../types"

export const initialAppContext: IAppContext = {
  about: '',
  alert: false,
  currentWeek: 0,
  emptyEditor: false,
  isItYou: true,
  nextWeek: 0,
  otherUserName: '',
  otherUserUID: '',
  season: 2023,
  selectedWeek: 0,
  tabActive: 1
}

export const initialUserContext: IUserContext = {
  name: '',
  locale: 'ru',
  email: '',
  admin: false,
  adminAsPlayer: true,
  tempName: '',
  tempLocale: ''
}

// export const initialWeeksContext = [{ number: '', name: '', questions: {} }]

// export const initialAboutContext = []

export const initialEditorContext: WeekType = {
  questions: {},
  name: '',
  active: false,
  deadline: new Date().getTime()
}

export const initialQuestionInWork = {
  question: '',
  total: '',
  id: null
}
