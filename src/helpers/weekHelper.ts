import { IAnswersContext, WeeksType, IWeeksContext, WeekType, QuestionType } from '../types'

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
  answersContext: IAnswersContext,
  selectedWeek: number,
  uid: string,
  id: number
) => {
  const res = answersContext.results[selectedWeek] ? answersContext.results[selectedWeek][id] : 0
  const ans =
    answersContext[uid] && answersContext[uid][selectedWeek]
      ? answersContext[uid][selectedWeek][id]
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