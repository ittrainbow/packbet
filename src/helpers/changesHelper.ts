import { store } from '../redux/store'
import { objectCompare } from './objectHelper'

export const weekGotChanges = () => {
  const { uid, admin, adminAsPlayer } = store.getState().user
  const results = store.getState().results
  const answers = store.getState().answers
  const compare = store.getState().compare
  const dataToCompare = admin && !adminAsPlayer ? results : answers

  if (!!Object.keys(dataToCompare).length) {
    const userChanges = !objectCompare(answers[uid], compare.answers)
    const adminChanges = admin ? !objectCompare(results, compare.results) : false
    const isAdmin = admin && !adminAsPlayer
    const result = isAdmin ? adminChanges : userChanges
    return result
  }
}
