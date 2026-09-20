export type StandingsSortMode = 'default' | 'percent-asc' | 'limit-desc' | 'limit-asc'

type SortableRow = {
  correct?: number
  faults?: number
  uid?: string
}

const byDesc = (a: number, b: number) => (a < b ? 1 : a > b ? -1 : 0)
const byAsc = (a: number, b: number) => (a < b ? -1 : a > b ? 1 : 0)

export const getSortedStandingsIndices = (rows: SortableRow[], mode: StandingsSortMode): number[] => {
  const indices = rows.map((_, i) => i)
  if (mode === 'default') return indices

  return indices.sort((i, j) => {
    const a = rows[i]
    const b = rows[j]

    if (mode === 'percent-asc') {
      const byPercent = byAsc(a.correct ?? 0, b.correct ?? 0)
      if (byPercent) return byPercent
      return byDesc(a.faults ?? 0, b.faults ?? 0)
    }

    const byLimit = mode === 'limit-desc' ? byDesc : byAsc
    const primary = byLimit(a.faults ?? 0, b.faults ?? 0)
    if (primary) return primary

    const byPercent = byDesc(a.correct ?? 0, b.correct ?? 0)
    if (byPercent) return byPercent

    return (a.uid ?? '').localeCompare(b.uid ?? '')
  })
}
