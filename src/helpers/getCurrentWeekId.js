export const getCurrentWeekId = (weeks) => {
  return weeks.map(el => el.number).filter((a, b) => a - b)[0]
}