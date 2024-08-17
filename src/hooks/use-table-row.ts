import { useSelector } from 'react-redux'

import { selectResults, selectStandings, selectTools } from '../redux/selectors'
import { Standings } from '../types'

export function useTableRow(index: number) {
  const { showOneWeek } = useSelector(selectTools)
  const { seasonSelected } = useSelector(selectTools)
  const standings = useSelector(selectStandings)
  const results = useSelector(selectResults)

  const season = seasonSelected === 2023 ? standings.season2023 : standings.season2024

  const week =
    seasonSelected === 2022 ? standings.season2022 : seasonSelected === 2023 ? standings.week2023 : standings.week2024

  if (seasonSelected === 2022) {
    const tableEl = standings.season2022[index]
    const { name, ansCorrect, ansTotal, position, percentage } = tableEl as Standings['season2022'][number]

    const correctAdjusted = ansTotal !== 0 ? (ansCorrect / ansTotal).toFixed(3) : '0.000'
    const userAnswers = ansCorrect + '/' + ansTotal
    const adjustedPercentage = percentage.toFixed(1)

    return { name, userAnswers, adjustedPercentage, position, correctAdjusted }
  }

  const tableEl = showOneWeek ? week[index] : season[index]
  const { name, ansCorrect, ansTotal, position, correct, faults, uid } = tableEl as Standings['season2023'][number]

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
