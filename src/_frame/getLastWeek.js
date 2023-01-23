export function getLastWeek(weeks) {
  const tmp = []
  Object.keys(weeks).forEach(el => {
    if (weeks[el].activity) tmp.push(weeks[el].id)
  })
  const last = Number(tmp[tmp.length - 1])
  return weeks[last]
}

export function getLastWeekNumber(weeks) {
  const array = Object.keys(weeks)
  const last = Number(array[array.length - 1])

  return last
}
