import { useSelector } from 'react-redux'

import { selectResults, selectStandings, selectTools } from '../redux/selectors'

export const useTableRow = (index: number) => {
  const { showOneWeek } = useSelector(selectTools)
  const { season, week } = useSelector(selectStandings)
  const results = useSelector(selectResults)

  const tableEl = showOneWeek ? week[index] : season[index]
  const { name, ansCorrect, ansTotal, position, uid, faults, correct } = tableEl

  const resultsTotal = Object.keys(results)
    .map((el) => Number(el))
    .map((el) => Object.keys(results[el]).length)
    .reduce((a, b) => a + b)

  const answersAdjusted = showOneWeek ? ansTotal : Math.max(ansTotal, resultsTotal - 10)

  const userAnswers = ansCorrect + '/' + answersAdjusted
  const correctAdjusted = ansTotal !== 0 ? correct.toFixed(3) : '0.000'
  const tableFaults = Math.max(0, faults)

  return { name, userAnswers, correctAdjusted, position, uid, tableFaults }
}
