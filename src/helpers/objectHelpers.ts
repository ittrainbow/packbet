import { AnswersType, WeekType } from '../types'

type CompareType = AnswersType | WeekType | { [key: number]: number }

export const getObjectsEquality = (obj1: CompareType = {}, obj2: CompareType = {}) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
