import { Answers, Week } from '../types'

type CompareType = Answers | { [key: number]: number }

export const getObjectsEquality = (obj1: CompareType = {}, obj2: CompareType = {}) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const getWeeksEquality = (obj1 = {} as Week, obj2 = {} as Week) => {
  const active = obj1.active === obj2.active
  const deadline = obj1.deadline === obj2.deadline
  const name = obj1.name === obj2.name
  const questions = JSON.stringify(obj1.questions) === JSON.stringify(obj2.questions)

  return active && deadline && name && questions
}
