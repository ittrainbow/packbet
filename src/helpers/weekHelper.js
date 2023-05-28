export const getWeeksIDs = (weeks) => {
  const arr = Object.keys(weeks)
  const currentWeek = arr
    .filter((el) => weeks[el].active)
    .map((el) => Number(el))
    .sort((a, b) => b - a)[0]

  const nextWeek = Number(arr.map((el) => Number(el)).sort((a, b) => b - a)[0]) + 1
  return { currentWeek, nextWeek }
}

export const getLastWeek = (weeks) => {
  return weeks.at(-1)
}

export const ansHelper = (answersContext, selectedWeek, uid, id) => {
  const res = answersContext.results[selectedWeek] ? answersContext.results[selectedWeek][id] : 0
  const ans =
    answersContext[uid] && answersContext[uid][selectedWeek]
      ? answersContext[uid][selectedWeek][id]
      : 0
  return { ans, res }
}
