import { IUserStore } from '../types'

export const initialUser: IUserStore = {
  name: '',
  locale: 'ru',
  admin: false,
  buddies: [],
  uid: ''
}
