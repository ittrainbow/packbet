import { useSelector } from 'react-redux'

import { selectResults, selectStandings, selectTools } from '../redux/selectors'

export const useTableRow = (index: number) => {
  const { showOneWeek } = useSelector(selectTools)
  const { seasonSelected } = useSelector(selectTools)
  const standings = useSelector(selectStandings)
  const results = useSelector(selectResults)

  const season =
    seasonSelected === 2022
      ? standings.season2022
      : seasonSelected === 2023
      ? standings.season2023
      : standings.season2024

  const week =
    seasonSelected === 2022 ? standings.week2022 : seasonSelected === 2023 ? standings.week2023 : standings.week2024

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
