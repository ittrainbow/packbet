export function getWeeks(data) {
  const array = Object.keys(data)
  const result = {}

  array.forEach(el => {
    const week = data[el]
    week['hash'] = el
    result[week.id] = week
  })

  return result
}