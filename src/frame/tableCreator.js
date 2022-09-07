export default function tableCreator(userdata, answers) {
  const table = []
  const data = userdata.data
  const results = answers.data.weeks

  const users = Object.keys(data)
    .map((el) => {
      data[el]['id'] = el
      return data[el]
    })
    .filter((el) => el.name !== 'Администратор')

  Object.keys(users).forEach((el) => {
    const name = users[el].name
    const week = users[el].weeks
    const id = users[el].id

    let totalAnswers = 0
    let correctAnswers = 0

    for (let i = 0; i < results.length; i++) {
      if (results[i] && week[i]) {
        for (let j = 0; j < week[i].length; j++) {
          if (week[i][j] !== null) totalAnswers++
          if (results[i][j] === week[i][j]) correctAnswers++
        }
      }
    }

    const calc = (correctAnswers / totalAnswers).toFixed(3)
    const percentage = isNaN(calc) ? '0.000' : calc

    table.push({
      name: name,
      totalAnswers: totalAnswers,
      correctAnswers: correctAnswers,
      percentage: percentage,
      id: id
    })

    function compare(a, b) {
      if (a.correctAnswers < b.correctAnswers) return 1
      if (a.correctAnswers > b.correctAnswers) return -1
      else return 0
    }

    table.sort(compare)
  })

  return table
}
