import { useSelector } from 'react-redux'

import { selectAnswers, selectApp, selectCompare, selectResults, selectUser } from '../redux/selectors'
import { getObjectsEquality } from '../utils'

export function useChanges() {
  const { uid, admin, adminAsPlayer } = useSelector(selectUser)
  const { currentWeek } = useSelector(selectApp)

  const results = useSelector(selectResults)
  const answers = useSelector(selectAnswers)
  const { answers: compareAnswers, results: compareResults } = useSelector(selectCompare)

  const userChanges = !getObjectsEquality(answers[uid][currentWeek], compareAnswers[currentWeek])
  const adminChanges = admin ? !getObjectsEquality(results[currentWeek], compareResults[currentWeek]) : false

  return admin && !adminAsPlayer ? adminChanges : userChanges
}
