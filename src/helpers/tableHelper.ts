import { AnswersType, IAnswers, IFetchObject, IPlayers, IUserStandings } from '../types'

export const tableObjectCreator = (ansTotal: number, ansCorrect: number, resultsTotal: number) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = ansTotal ? ansCorrect / ansTotal : 0
  return { total, correct }
}

export const tableCreator = (answers: IAnswers, players: IPlayers, results: AnswersType) => {
  const userList = Object.keys(players)
  const object: IFetchObject<IUserStandings> = {}
  userList.forEach((el) => {
    let ansTotal = 0
    let ansCorrect = 0
    let resultsTotal = 0
    const uid = el
    const { name } = players[el]
    const ans = answers ? answers[el] : null
    Object.keys(results)
      .map((el) => Number(el))
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
    table[index]['position'] = samePosition ? '-' : index + 1
  })

  for (let i = 10; i < 100; i++) {
    const obj = {
      ansCorrect: 5,
      ansTotal: 10,
      resultsTotal: 12,
      name: `Name ${i}`,
      position: i.toString(),
      correct: 0.5,
      uid: ''
    }

    if (i > 50) table.push(obj)
    else table.unshift(obj)
  }

  return table
}

export const tableHelper = (el: IUserStandings) => {
  const { name, ansCorrect, ansTotal, position, resultsTotal } = el
  const answers = ansCorrect + '/' + ansTotal
  const correct = ansTotal !== 0 ? (ansCorrect / ansTotal).toFixed(3) : '0.000'
  const ninety = ((ansTotal * 100) / resultsTotal).toFixed(0) + '%'

  return { name, answers, correct, ninety, position }
}
