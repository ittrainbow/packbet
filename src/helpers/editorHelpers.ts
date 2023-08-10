import { QuestionsType } from '../types'

export const getNewQuestionId = (questions: QuestionsType): number => {
  const num =
    Object.keys(questions)
      .map((el) => Number(el))
      .sort((a, b) => b - a)[0] + 1 || 0
  return num
}
