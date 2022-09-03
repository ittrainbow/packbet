export function getWeeks(data) {
  return (
    Object.keys(data)
      .map(el => {
        const obj = {...data[el]}
        obj['hash'] = el
        return obj
      })
  )
}