export const tableObjectCreator = (ansTotal, ansCorrect, resultsTotal) => {
  const total = ((ansTotal / resultsTotal) * 100).toFixed(0) + '%'
  const correct = Number((ansCorrect / resultsTotal).toFixed(3))
  const slash = ansCorrect + '/' + ansTotal

  return { total, correct, slash }
}
