import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import {
  IAboutContext,
  IAnswersContext,
  IUserListContext,
  QuestionType,
  QuestionsType,
  WeekType
} from '../types'

export const objectTrim = (object: QuestionsType, id: number) => {
  const obj = structuredClone(object)
  delete obj[id]
  return obj
}

export const getNewQuestionId = (questions: QuestionsType): number => {
  const num =
    Object.keys(questions)
      .map((el) => Number(el))
      .sort((a, b) => b - a)[0] + 1 || 0
  return num
}

export const objectCompose = (response: QuerySnapshot<DocumentData>) => {
  const obj: IAboutContext | IAboutContext | IUserListContext | IAnswersContext = {}
  response.forEach((el) => {
    obj[el.id] = el.data()
  })
  return obj
}

export const objectReplace = (questions: QuestionsType, id: number, replacement: QuestionType) => {
  const obj = structuredClone(questions)
  obj[id] = replacement
  return obj
}

type CompareAnswersType = { [key: number]: { [key: number]: number } } | WeekType

export const objectCompare = (obj1: CompareAnswersType = {}, obj2: CompareAnswersType = {}) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const objectNewId = (questions: { [key: number]: QuestionType }) => {
  const nums = Object.keys(questions)
  const value =
    nums.map((el: string) => Number(el)).sort((a: number, b: number) => b - a)[0] + 1 || 0
  return nums.length > 0 ? value : 0
}