import { Weeks } from '../types'

export const getWeeksIDs = (weeks: Weeks) => {
  const arr = Object.keys(weeks).map((el) => Number(el))
  const currentWeek = arr
    .filter((el) => weeks[el].active)
    .map((el) => Number(el))
    .sort((a, b) => b - a)[0]

  const nextWeek = arr.map((el) => Number(el)).sort((a, b) => b - a)[0] + 1 || 0
  return { currentWeek, nextWeek }
}
