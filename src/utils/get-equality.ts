import { Week } from '@/types'

export function getObjectsEquality(obj1: object = {}, obj2: object = {}): boolean {
  const record1 = obj1 as Record<string, unknown>
  const record2 = obj2 as Record<string, unknown>
  const keys1 = Object.keys(record1).sort()
  const keys2 = Object.keys(record2).sort()

  if (JSON.stringify(keys1) !== JSON.stringify(keys2)) return false

  return keys1.every((key) => {
    const value1 = record1[key]
    const value2 = record2[key]

    if (typeof value1 === 'object' && value1 && typeof value2 === 'object' && value2) {
      return getObjectsEquality(value1, value2)
    }

    return value1 === value2
  })
}

export function getWeeksEquality(obj1?: Week, obj2?: Week) {
  if (!obj1 || !obj2) return false

  const active = obj1.active === obj2.active
  const deadline = obj1.deadline === obj2.deadline
  const name = obj1.name === obj2.name
  const questions = getObjectsEquality(obj1.questions, obj2.questions)

  return active && deadline && name && questions
}
