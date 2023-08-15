import { QuestionsType } from '../types'

export const getNewQuestionId = (questions: QuestionsType): number => {
  const questionsIds = Object.keys(questions).map((el) => Number(el))

  for (let id of questionsIds) {
    if (id !== questionsIds[id]) {
      return id - 1
    }
  }

  return (
    Object.keys(questions)
      .map((el) => Number(el))
      .sort((a, b) => b - a)[0] + 1 || 0
  )
}
