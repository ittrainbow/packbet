export function findUser(obj, email) {
  return Object.keys(obj).filter(el => obj[el].email === email)
}