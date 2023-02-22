export const objectTrim = (object, id) => {
  const obj = { ...object }
  delete obj[id]
  return obj
}

export const objectCompose = (response) => {
  const obj = {}
  response.forEach((el) => {
    obj[el.id] = el.data()
  })
  return obj
}

export const objectReplace = (object, id, replacement) => {
  const obj = { ...object }
  obj[id] = replacement
  return obj
}

export const objectCompare = (obj1, obj2, submit) => {
  if (obj1 === undefined && Object.keys(obj2).length === 0 && submit) return true
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const objectNewId = ({questions}) => {
  const value = Number(Object.keys(questions).sort((a, b) => b - a)[0]) + 1
  return value ? value : 0
}