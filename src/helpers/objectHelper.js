export const objectTrim = (object, id) => {
  const obj = structuredClone(object)
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
  const obj = structuredClone(object)
  obj[id] = replacement
  return obj
}

export const objectCompare = (obj1, obj2, submit) => {
  return (
    (obj1 === undefined && Object.keys(obj2).some((el) => el) && submit) ||
    JSON.stringify(obj1 || {}) === JSON.stringify(obj2)
  )
}

export const objectNewId = ({ questions }) => {
  const value = Number(Object.keys(questions).sort((a, b) => b - a)[0]) + 1
  return value ? value : 0
}
