import { AnswersStore } from '@/types'

export type QuestionStat = {
  id: number
  correct: number
  answered: number
}

// сколько верных ответов по каждому вопросу недели
export const getQuestionStats = (
  weekId: number,
  weekResults: Record<string, number> | undefined,
  answers: AnswersStore
): QuestionStat[] => {
  if (!weekResults) return []

  return Object.keys(weekResults)
    .map(Number)
    .map((id) => {
      let correct = 0
      let answered = 0
      const expected = weekResults[id]

      Object.values(answers).forEach((userAnswers) => {
        const ans = userAnswers?.[weekId]?.[id]
        if (!ans) return
        answered++
        if (ans === expected) correct++
      })

      return { id, correct, answered }
    })
    .sort((a, b) => b.correct - a.correct || b.answered - a.answered || a.id - b.id)
}
