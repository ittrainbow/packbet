import { AnswersStore, QuestionStatEntry, QuestionStats } from '@/types'

export type QuestionStat = {
  id: number
  correct: number
  answered: number
}

// сколько верных ответов по каждому вопросу недели (answers игроков; results — эталон)
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

export const toQuestionStatsRecord = (stats: QuestionStat[]): QuestionStats =>
  Object.fromEntries(stats.map(({ id, correct, answered }) => [String(id), { correct, answered }]))

export const fromQuestionStatsRecord = (record: QuestionStats | undefined): QuestionStat[] => {
  if (!record) return []
  return Object.entries(record)
    .map(([id, entry]: [string, QuestionStatEntry]) => ({
      id: Number(id),
      correct: entry.correct,
      answered: entry.answered
    }))
    .sort((a, b) => b.correct - a.correct || b.answered - a.answered || a.id - b.id)
}

export const buildQuestionStatsRecord = (
  weekId: number,
  weekResults: Record<string, number> | undefined,
  answers: AnswersStore
): QuestionStats | undefined => {
  if (!weekResults || !Object.keys(weekResults).length) return undefined
  return toQuestionStatsRecord(getQuestionStats(weekId, weekResults, answers))
}
