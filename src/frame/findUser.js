export function findUser(obj, email) {
  return Object.keys(obj).filter((el) => obj[el].email === email)
}

export function findName(obj, name) {
  return Object.keys(obj).filter((el) => obj[el].name === name)
}
