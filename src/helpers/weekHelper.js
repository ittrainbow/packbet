export const getCurrentWeekId = (weeks) => {
  return Object.keys(weeks).map(el => Number(el)).sort((a, b) => b-a)[0]
}

export const getLastWeek = (weeks) => {
  return weeks[weeks.length - 1]
}