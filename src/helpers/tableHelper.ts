import { IAnswers, IPlayers, IUserStandings } from '../types'

export const tableObjectCreator = (ansTotal: number, ansCorrect: number, resultsTotal: number) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = ansTotal ? ansCorrect / ansTotal : 0
  return { total, correct }
}

export const tableCreator = (
  answers: IAnswers,
  players: IPlayers
) => {
  const userList = Object.keys(players)
  const object: { [key: string]: IUserStandings } = {}
  userList.forEach((el) => {
    let ansTotal = 0
    let ansCorrect = 0
    let resultsTotal = 0
    const uid = el
    const { name } = players[el]
    const ans = answers ? answers[el] : null
    const res = answers.results ?? null
    Object.keys(res)
      .map((el) => Number(el))
      .forEach((el) => {
        const subAns = ans ? ans[el] : null
        res[el] &&
          Object.keys(res[el])
            .map((el) => Number(el))
            .forEach((i) => {
              resultsTotal++
              subAns && subAns[i] && ansTotal++
              subAns && subAns[i] && subAns[i] === res[el][i] && ansCorrect++
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
    table[index]['position'] = samePosition ? '-' : index + 1
  })

  return table
}
