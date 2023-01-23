export default function tableCreator(users, answers) {
  
  let table = []
  const tableOver = []
  const tableUnder = []
  const results = answers.data.weeks
  const limit = answers.data.weeks.join(',').replace(',,', ',').split(',').length

  Object.keys(users).forEach((el) => {
    const name = users[el].name
    const week = users[el].weeks
    const id = el

    let totalAnswers = 0
    let correctAnswers = 0

    for (let i = 0; i < results.length; i++) {
      if (results[i] && week[i]) {
        for (let j = 0; j < week[i].length; j++) {
          if (week[i][j] !== null && results[i][j]) {
            totalAnswers++
          }
          if (results[i][j] === week[i][j] && results[i][j]) {
            correctAnswers++
          }
        }
      }
    }

    const calc = (correctAnswers / totalAnswers).toFixed(3)
    const ninety = (totalAnswers / limit).toFixed(3)
    const percentage = isNaN(calc) ? '0.000' : calc

    if (name !== 'Администратор') {
      if (totalAnswers > limit - 27) {
        tableOver.push({
          name: name,
          totalAnswers: totalAnswers,
          correctAnswers: correctAnswers,
          percentage: percentage,
          id: id,
          ninety: ninety
        })
      }

      else {
        tableUnder.push({
          name: name,
          totalAnswers: totalAnswers,
          correctAnswers: correctAnswers,
          percentage: percentage,
          id: id,
          ninety: ninety
        })
      }
    }

    function compare(a, b) {
      if (a.percentage < b.percentage) return 1
      if (a.percentage > b.percentage) return -1
      else return 0
    }

    tableOver.sort(compare)
    tableUnder.sort(compare)

    table = tableOver.concat(tableUnder)
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
