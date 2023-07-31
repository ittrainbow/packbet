import { IApp, IUser } from '../types'

export const initialAppContext: IApp = {
  mobile: true,
  loading: false,
  editor: false,
  error: '',
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

export const initialUser: IUser = {
  name: '',
  locale: 'ru',
  email: '',
  admin: false,
  adminAsPlayer: true
}
