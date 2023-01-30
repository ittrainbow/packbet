export const getCurrentWeekId = (weeks) => {
  return Object.keys(weeks)
    .map((el) => Number(el))
    .sort((a, b) => b - a)[0]
}

export const getLastWeek = (weeks) => {
  return weeks[weeks.length - 1]
}

export const ansHelper = (answersContext, selectedWeek, uid, id) => {
  const res = answersContext.results[selectedWeek] ? answersContext.results[selectedWeek][id] : 0
  const ans = answersContext[uid][selectedWeek] ? answersContext[uid][selectedWeek][id] : 0
  return { ans, res }
}
