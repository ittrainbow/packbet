export const initialAppContext = {
  about: '',
  alert: false,
  currentWeek: 0,
  emptyEditor: false,
  isItYou: true,
  nextWeek: null,
  otherUserName: '',
  otherUserUID: '',
  season: 2023,
  selectedWeek: 0,
  tabActive: 1
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
