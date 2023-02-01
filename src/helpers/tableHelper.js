export const tableObjectCreator = (ansTotal, ansCorrect, resultsTotal) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = (ansCorrect / resultsTotal).toFixed(3).toString()
  const slash = ansCorrect + '/' + ansTotal

  return { total, correct, slash }
}

export const standingsCreator = (answersContext, userListContext) => {
  const userList = Object.keys(userListContext)
  const object = {}
  userList.forEach((el) => {
    let ansTotal = 0
    let ansCorrect = 0
    let resultsTotal = 0
    const uid = el
    const { name } = userListContext[el]
    const ans = answersContext ? answersContext[el] : null
    const res = answersContext.results || null
    Object.keys(res).forEach((el) => {
      const subAns = ans ? ans[el] : null
      Object.keys(res[el]).forEach((i) => {
        resultsTotal++
        if (subAns && subAns[i]) ansTotal++
        if (subAns && subAns[i] && subAns[i] === res[el][i]) ansCorrect++
      })
    })

    const { total, correct, slash } = tableObjectCreator(ansTotal, ansCorrect, resultsTotal)
    object[el] = { name, uid, slash, total, correct }
  })

  const array = []
  Object.keys(object).map((el) => array.push(object[el]))
  const compare = (a, b) => (a.correct < b.correct ? 1 : a.correct > b.correct ? -1 : 0)
  
  return array.sort(compare)
}