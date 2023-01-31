// export const getCurrentWeekId = (weeks) => {
//   return Object.keys(weeks)
//     .filter((el) => weeks[el].active)
//     .map((el) => Number(el))
//     .sort((a, b) => b - a)[0]
// }

export const getWeeksIDs = (weeks) => {
  const arr = Object.keys(weeks)
  const currentWeek = arr
    .filter((el) => weeks[el].active)
    .map((el) => Number(el))
    .sort((a, b) => b - a)[0]

  const nextWeek = Number(arr.map((el) => Number(el)).sort((a, b) => b - a)[0]) + 1
  return { currentWeek, nextWeek }
}

// export const getNewWeekId = (weeks) => {
//   return (
//     Number(
//       Object.keys(weeks)
//         .map((el) => Number(el))
//         .sort((a, b) => b - a)[0]
//     ) + 1
//   )
// }

export const getLastWeek = (weeks) => {
  return weeks[weeks.length - 1]
}

export const ansHelper = (answersContext, selectedWeek, uid, id) => {
  if (answersContext[uid]) {
    const res = answersContext.results[selectedWeek] ? answersContext.results[selectedWeek][id] : 0
    const ans = answersContext[uid][selectedWeek] ? answersContext[uid][selectedWeek][id] : 0
    return { ans, res }
  }
  return { ans: 0, res: 0 }
}
