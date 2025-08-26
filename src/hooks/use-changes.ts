import { useSelector } from 'react-redux'

import { selectAnswers, selectApp, selectCompare, selectResults, selectUser } from '../redux/selectors'
import { getObjectsEquality } from '../utils'

export function useChanges() {
  const { uid, admin, adminAsPlayer } = useSelector(selectUser)
  const { currentWeek } = useSelector(selectApp)

  const results = useSelector(selectResults)
  const answers = useSelector(selectAnswers)
  const compare = useSelector(selectCompare)

  const userChanges = !getObjectsEquality(
    answers && answers[uid] ? answers[uid][currentWeek] : {},
    compare.answers ? compare.answers[currentWeek] : {}
  )

  const adminChanges = !getObjectsEquality(
    results ? results[currentWeek] : {},
    compare.results ? compare.results[currentWeek] : {}
  )

  return admin && !adminAsPlayer ? adminChanges : userChanges
}
