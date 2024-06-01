import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectAnswers, selectCompare, selectResults, selectUser } from '../redux/selectors'
import { getObjectsEquality } from '../utils'

export const useChanges = () => {
  const { uid, admin, adminAsPlayer } = useSelector(selectUser)
  const [gotChanges, setGotChanges] = useState(false)
  const results = useSelector(selectResults)
  const answers = useSelector(selectAnswers)
  const compare = useSelector(selectCompare)

  useEffect(() => {
    const isAdmin = admin && !adminAsPlayer
    const userChanges = !getObjectsEquality(answers[uid], compare.answers)
    const adminChanges = admin ? !getObjectsEquality(results, compare.results) : false
    const changes = isAdmin ? adminChanges : userChanges
    setGotChanges(changes)
    // eslint-disable-next-line
  }, [answers, results])

  return gotChanges
}
