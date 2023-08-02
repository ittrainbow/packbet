import { AnswersType, IAnswers, IFetchObject, IPlayers, IUserStandings } from '../types'

export const tableObjectCreator = (ansTotal: number, ansCorrect: number, resultsTotal: number) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = ansTotal ? ansCorrect / ansTotal : 0
  return { total, correct }
}

export const tableCreator = (
  answers: IAnswers,
  players: IPlayers,
  results: AnswersType
) => {
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

  // const newObj =
  // {
  //   ansCorrect: 1,
  //   ansTotal: 1,
  //   correct: 1,
  //   name: 'Green 19',
  //   uid: 'LMvVM4Looheqk4GOwh12luivVrk1',
  //   resultsTotal: 11,
  //   position: 4
  // }

  // const arr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
  // arr.forEach(el => {
  //   const obj = structuredClone(newObj)
  //   if (el === 25) {
  //     obj.name = '12345'
  //   }
  //   obj.position = el
  //   table.unshift(obj)
  // })

  return table
}
