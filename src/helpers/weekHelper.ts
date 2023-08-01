import { WeeksType, IWeeksContext, WeekType, QuestionType, IAnswers, AnswersType } from '../types'

export const getWeeksIDs = (weeks: WeeksType | IWeeksContext) => {
  const arr = Object.keys(weeks).map((el) => Number(el))
  const currentWeek = arr
    .filter((el) => weeks[el].active)
    .map((el) => Number(el))
    .sort((a, b) => b - a)[0]

  const nextWeek = arr.map((el) => Number(el)).sort((a, b) => b - a)[0] + 1 || 0
  return { currentWeek, nextWeek }
}

export const ansHelper = (
  answers: IAnswers,
  results: AnswersType,
  selectedWeek: number,
  uid: string,
  id: number
) => {
  const res = results[selectedWeek] ? results[selectedWeek][id] : 0
  const ans =
    answers[uid] && answers[uid][selectedWeek]
      ? answers[uid][selectedWeek][id]
      : 0
  return { ans, res }
}

export const emptyWeek: WeekType = {
  questions: {},
  name: '',
  active: false,
  deadline: new Date().getTime()
}

export const emptyQuestion: QuestionType = {
  question: '',
  total: '',
  id: null
}