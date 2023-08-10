import { store } from '../redux/store'
import { getObjectsEquality } from '.'

export const getWeekChangesStatus = () => {
  const { uid, admin, adminAsPlayer } = store.getState().user
  const results = store.getState().results
  const answers = store.getState().answers
  const compare = store.getState().compare
  const dataToCompare = admin && !adminAsPlayer ? results : answers

  if (!!Object.keys(dataToCompare).length) {
    const userChanges = !getObjectsEquality(answers[uid], compare.answers)
    const adminChanges = admin ? !getObjectsEquality(results, compare.results) : false
    const isAdmin = admin && !adminAsPlayer
    const result = isAdmin ? adminChanges : userChanges
    return result
  }
}
