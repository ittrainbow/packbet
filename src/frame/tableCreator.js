export default function tableCreator(users, answers) {
  const table = []
  const results = answers.data.weeks

  Object.keys(users).forEach((el) => {
    const name = users[el].name
    const week = users[el].weeks
    const id = el

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

    if (name !== 'Администратор') {
      table.push({
        name: name,
        totalAnswers: totalAnswers,
        correctAnswers: correctAnswers,
        percentage: percentage,
        id: id
      })
    }

    function compare(a, b) {
      if (a.correctAnswers < b.correctAnswers) return 1
      if (a.correctAnswers > b.correctAnswers) return -1
      else return 0
    }

    table.sort(compare)
  })
  
  Object.keys(table).forEach((el, index) => {
    if (index === 0) {
      table[index].place = 1
    } else if (table[index - 1].percentage === table[index].percentage) {
      table[index].place = '-'
    } else {
      table[index].place = index + 1
    }
  })

  return table
}
