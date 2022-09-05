export function getLastWeek(weeks) {
  const array = Object.keys(weeks)
  const last = Number(array[array.length - 1])

  return weeks[last]
}

export function getLastWeekNumber(weeks) {
  const array = Object.keys(weeks)
  const last = Number(array[array.length - 1])

  return last
}
