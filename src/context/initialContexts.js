export const initialAppContext = {
  tabActive: 1,
  season: 2023,
  about: '',
  currentWeek: 0,
  nextWeek: null,
  selectedWeek: 0,
  emptyEditor: false,
  isItYou: true,
  otherUserUID: null,
  otherUserName: null,
  alert: false
}

export const initialUserContext = {
  name: '',
  locale: 'ru',
  email: '',
  admin: false,
  adminAsPlayer: true,
  tempName: '',
  tempLocale: ''
}

export const initialWeeksContext = [{ number: '', name: '', questions: {} }]

export const initialAboutContext = []

export const initialEditorContext = {
  questions: {},
  name: '',
  active: false,
  deadline: ''
}

export const initialQuestionInWork = {
  question: '',
  total: '',
  id: null
}
