import { useSelector } from 'react-redux'

import { selectApp, selectResults, selectStandings, selectTools } from '@/redux/selectors'
import { getSeasonStandings, getWeekStandings } from '@/utils'

export function useTableRow(index: number) {
  const { showOneWeek } = useSelector(selectTools)
  const { seasonSelected } = useSelector(selectTools)
  const { lastSeasonLastWeek } = useSelector(selectApp)
  const standings = useSelector(selectStandings)
  const results = useSelector(selectResults)

  if (seasonSelected === 2022) {
    const { name, ansCorrect, ansTotal, position, percentage } = standings.season2022[index]

    const correctAdjusted = ansTotal !== 0 ? (ansCorrect / ansTotal).toFixed(3) : '0.000'
    const userAnswers = ansCorrect + '/' + ansTotal
    const adjustedPercentage = percentage.toFixed(1)

    return { name, userAnswers, adjustedPercentage, position, correctAdjusted }
  }

  const season = getSeasonStandings(standings, seasonSelected)
  const week = getWeekStandings(standings, seasonSelected)
  const tableEl = showOneWeek ? week[index] : season[index]

  const { name, ansCorrect, ansTotal, position, correct, faults, uid } = tableEl

  const filteredResults = Object.keys(results)
    .map((el) => Number(el))
    // только недели текущего сезона
    .filter((el) => el > lastSeasonLastWeek)

  const resultsTotal =
    filteredResults.length > 0
      ? filteredResults.map((el) => Object.keys(results[el]).length).reduce((a, b) => a + b)
      : 0

  const answersAdjusted = showOneWeek ? ansTotal : Math.max(ansTotal, resultsTotal - 10)

  const userAnswers = ansCorrect + '/' + answersAdjusted
  const correctAdjusted = ansTotal !== 0 ? correct.toFixed(3) : '0.000'
  const tableFaults = Math.max(0, faults)

  return {
    name,
    userAnswers,
    correctAdjusted,
    ansCorrect,
    answersAdjusted,
    ansTotal,
    resultsTotal,
    position,
    uid,
    tableFaults
  }
}
