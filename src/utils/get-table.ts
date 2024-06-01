import { IUserStandings, IAnswers, IPlayers, AnswersType } from '../types'

type TableCreatorType = {
  answers: IAnswers
  players: IPlayers
  results: AnswersType
  fullSeason: boolean
}

type FetchObjectType<T> = {
  [key: number | string]: T
}

export const getTable = ({ answers, players, results, fullSeason }: TableCreatorType) => {
  const userList = Object.keys(players)
  const object: FetchObjectType<IUserStandings> = {}
  userList.forEach((el) => {
    let ansTotal = 0
    let ansCorrect = 0
    let resultsTotal = 0
    const uid = el
    const { name } = players[el]
    const lastWeek = Number(Object.keys(results).splice(-1))
    const ans = answers && answers[el] ? answers[el] : {}
    Object.keys(results)
      .map((el) => Number(el))
      .filter((el) => (fullSeason ? el >= 0 : el === lastWeek))
      .forEach((el) => {
        const subAns = ans ? ans[el] : null
        results[el] &&
          Object.keys(results[el])
            .map((el) => Number(el))
            .forEach((i) => {
              resultsTotal++
              subAns && subAns[i] && ansTotal++
              subAns && subAns[i] && subAns[i] === results[el][i] && ansCorrect++
            })
      })

    const lastWeekTotal = Object.keys(results[lastWeek]).length
    const ansTotalWithFaults = fullSeason ? Math.max(ansTotal, resultsTotal - 10) : lastWeekTotal
    const correct = ansTotal ? ansCorrect / ansTotalWithFaults : 0
    const faults = ansTotal - resultsTotal + 10
    object[el] = { name, uid, ansCorrect, ansTotal, resultsTotal, correct, position: '', faults }
  })

  const array: IUserStandings[] = Object.keys(object).map((el) => object[el])

  const table = array.sort((a: IUserStandings, b: IUserStandings) => {
    return a.correct < b.correct
      ? 1
      : a.correct > b.correct
      ? -1
      : a.faults < b.faults
      ? 1
      : a.faults > b.faults
      ? -1
      : 0
  })

  table.forEach((_, index) => {
    const samePosition = index > 0 && table[index].correct === table[index - 1].correct
    table[index]['position'] = samePosition ? table[index - 1].position : index + 1
  })

  return table
}
