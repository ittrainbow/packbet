import { IAnswers } from '../types'

export const getAnswersResults = (answers: IAnswers, result: number, selectedWeek: number, uid: string, id: number) => {
  const res = result ?? 0
  const ans = answers[uid] && answers[uid][selectedWeek] ? answers[uid][selectedWeek][id] : 0
  return { ans, res }
}
