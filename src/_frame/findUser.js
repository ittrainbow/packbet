export function findUser(obj, localId) {
  return Object.keys(obj).filter((el) => obj[el].localId === localId)
}

export function findName(obj, name) {
  return Object.keys(obj).filter((el) => obj[el].name === name)
}
