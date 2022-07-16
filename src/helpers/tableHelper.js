export const tableObjectCreator = (ansTotal, ansCorrect, resultsTotal) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = ansTotal ? (ansCorrect / ansTotal).toFixed(3).toString() : '0.000'
  const slash = ansCorrect + '/' + ansTotal
  return { total, correct, slash }
}

export const tableCreator = (answersContext, userListContext) => {
  const userList = Object.keys(userListContext)
  const object = {}
  userList.forEach((el) => {
    let ansTotal = 0
    let ansCorrect = 0
    let resultsTotal = 0
    const uid = el
    const { name } = userListContext[el]
    const ans = answersContext ? answersContext[el] : null
    const res = answersContext.results ?? null
    Object.keys(res).forEach((el) => {
      const subAns = ans ? ans[el] : null
      res[el] &&
        Object.keys(res[el]).forEach((i) => {
          resultsTotal++
          subAns && subAns[i] && ansTotal++
          subAns && subAns[i] && subAns[i] === res[el][i] && ansCorrect++
        })
    })

    const { total, correct, slash } = tableObjectCreator(ansTotal, ansCorrect, resultsTotal)
    object[el] = { name, uid, slash, total, correct }
  })

  const array = []
  Object.keys(object).map((el) => array.push(object[el]))
  const compare = (a, b) => {
    return a.correct < b.correct ? 1 : a.correct > b.correct ? -1 : 0
  }

  const table = array.sort(compare)

  table.forEach((_, index) => {
    const samePosition = index > 0 && table[index].correct === table[index - 1].correct
    table[index]['position'] = samePosition ? '-' : index + 1
  })

  return table
}
