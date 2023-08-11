import { useSelector } from 'react-redux'

import { selectAnswers, selectCompare, selectResults, selectUser } from '../redux/selectors'
import { getObjectsEquality } from '../helpers'

export const useChanges = () => {
  const { uid, admin, adminAsPlayer } = useSelector(selectUser)
  const results = useSelector(selectResults)
  const answers = useSelector(selectAnswers)
  const compare = useSelector(selectCompare)
  const dataToCompare = admin && !adminAsPlayer ? results : answers

  if (!!Object.keys(dataToCompare).length) {
    const userChanges = !getObjectsEquality(answers[uid], compare.answers)
    const adminChanges = admin ? !getObjectsEquality(results, compare.results) : false
    const isAdmin = admin && !adminAsPlayer
    const result = isAdmin ? adminChanges : userChanges
    return result
  }

  return false
}
