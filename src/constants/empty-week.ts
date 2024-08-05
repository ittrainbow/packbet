import { Week } from '../types'

export const emptyWeek: Week = {
  questions: {},
  name: '',
  active: false,
  deadline: new Date().getTime()
}
