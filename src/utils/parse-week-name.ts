const SCORE = /^\d+[-–]\d+$/

export const parseWeekName = (name = '') => {
  const [, ...rest] = name.split('.')
  const matchPart = rest.join('.').trim() || name.trim()
  const tokens = matchPart.split(/\s+/).filter(Boolean)
  const last = tokens.at(-1) ?? ''
  const hasScore = SCORE.test(last)

  return {
    match: hasScore ? tokens.slice(0, -1).join(' ') : matchPart,
    score: hasScore ? last.replace('–', '-') : null
  }
}
