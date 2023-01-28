export const objectTrim = (object, id) => {
  const obj = { ...object }
  delete obj[id]
  return obj
}

export const objectCompose = (response) => {
  const obj = {}
  response.forEach((el) => (obj[Number(el.id)] = el.data()))
  return obj
}

export const objectReplace = (object, id, id2, replacement) => {
  const obj = { ...object }
  obj[id !== null ? id : id2] = replacement
  return obj
}

export const objectCompare = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
