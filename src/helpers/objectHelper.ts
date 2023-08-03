import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import { IAbout, IAnswers, AnswersType, IPlayers, QuestionType, QuestionsType, WeekType } from '../types'

type CompareType = AnswersType | WeekType | { [key: number]: number }

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
  const obj: IAbout | IPlayers | IAnswers = {}
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

export const objectCompare = (obj1: CompareType = {}, obj2: CompareType = {}) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
