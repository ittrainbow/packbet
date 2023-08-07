import { IFetchObject, IUserStandings, TableCreatorType } from '../types'

export const tableObjectCreator = (ansTotal: number, ansCorrect: number, resultsTotal: number) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = ansTotal ? ansCorrect / ansTotal : 0
  return { total, correct }
}

export const tableCreator = ({ answers, players, results, fullSeason }: TableCreatorType) => {
  const userList = Object.keys(players)
  const object: IFetchObject<IUserStandings> = {}
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
      .filter((el) => {
        return fullSeason ? el >= 0 : el === lastWeek
      })
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

    const { correct } = tableObjectCreator(ansTotal, ansCorrect, resultsTotal)
    object[el] = { name, uid, ansTotal, ansCorrect, resultsTotal, correct, position: '' }
  })

  const array: IUserStandings[] = Object.keys(object).map((el) => object[el])

  const table = array.sort((a: IUserStandings, b: IUserStandings) => {
    return a.correct < b.correct ? 1 : a.correct > b.correct ? -1 : 0
  })

  table.forEach((_, index) => {
    const samePosition = index > 0 && table[index].correct === table[index - 1].correct
    table[index]['position'] = samePosition ? table[index - 1].position : index + 1
  })

  return [...table, ...table, ...table]
}

export const tableHelper = (el: IUserStandings) => {
  const { name, ansCorrect, ansTotal, position, resultsTotal, uid } = el
  const answers = ansCorrect + '/' + ansTotal
  const correct = ansTotal !== 0 ? (ansCorrect / ansTotal).toFixed(3) : '0.000'
  const ninety = ((ansTotal * 100) / resultsTotal).toFixed(0) + '%'

  return { name, answers, correct, ninety, position, uid }
}
