import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import {
  IAboutContext,
  IAnswersContext,
  IUserListContext,
  QuestionType,
  QuestionsType,
  Week
} from '../types'

export const objectTrim = (object: QuestionType, id: number) => {
  const obj = structuredClone(object)
  delete obj[id]
  return obj
}

export const objectCompose = (response: QuerySnapshot<DocumentData>) => {
  const obj: IAboutContext | IAboutContext | IUserListContext | IAnswersContext = {}
  response.forEach((el) => {
    obj[el.id] = el.data()
  })
  return obj
}

type ReplacementType = {
  id?: number | null
  question: string
  total: string
}

export const objectReplace = (
  questions: QuestionsType,
  id: number,
  replacement: ReplacementType
) => {
  console.log(3, replacement)
  const obj = structuredClone(questions)
  obj[id] = replacement
  return obj
}

type CompareAnswersType = { [key: number]: { [key: number]: number } } | Week

export const objectCompare = (obj1: CompareAnswersType = {}, obj2: CompareAnswersType = {}) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const objectNewId = (questions: { [key: number]: QuestionType }) => {
  const nums = Object.keys(questions)
  const value =
    nums.length > 0 &&
    nums.map((el: string) => Number(el)).sort((a: number, b: number) => b - a)[0] + 1
  return nums.length > 0 ? value : 0
}
