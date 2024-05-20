import { IAnswers, WeeksType } from '../types'

export const getWeeksIDs = (weeks: WeeksType) => {
  const arr = Object.keys(weeks).map((el) => Number(el))
  const currentWeek = arr
    .filter((el) => weeks[el].active)
    .map((el) => Number(el))
    .sort((a, b) => b - a)[0]

  const nextWeek = arr.map((el) => Number(el)).sort((a, b) => b - a)[0] + 1 || 0
  return { currentWeek, nextWeek }
}

export const getAnswersResults = (answers: IAnswers, result: number, selectedWeek: number, uid: string, id: number) => {
  const res = result ?? 0
  const ans = answers[uid] && answers[uid][selectedWeek] ? answers[uid][selectedWeek][id] : 0
  return { ans, res }
}
