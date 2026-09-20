const SCORE = /^(\d+)[-–](\d+)$/
const SCORE_GLUED_OT = /^(\d+)[-–](\d+)(ОТ|OT)$/i
const OT = /^(ОТ|OT)$/i

const normalizeScore = (left: string, right: string, ot?: string) => {
  const base = `${left}-${right}`
  return ot ? `${base} ${ot}` : base
}

export const parseWeekName = (name = '') => {
  const [, ...rest] = name.split('.')
  const matchPart = rest.join('.').trim() || name.trim()
  const tokens = matchPart.split(/\s+/).filter(Boolean)
  const last = tokens.at(-1) ?? ''
  const prev = tokens.at(-2) ?? ''

  const glued = last.match(SCORE_GLUED_OT)
  if (glued) {
    return {
      match: tokens.slice(0, -1).join(' '),
      score: normalizeScore(glued[1], glued[2], glued[3])
    }
  }

  if (OT.test(last)) {
    const scoreOnly = prev.match(SCORE)
    if (scoreOnly) {
      return {
        match: tokens.slice(0, -2).join(' '),
        score: normalizeScore(scoreOnly[1], scoreOnly[2], last)
      }
    }
  }

  const scoreOnly = last.match(SCORE)
  if (scoreOnly) {
    return {
      match: tokens.slice(0, -1).join(' '),
      score: normalizeScore(scoreOnly[1], scoreOnly[2])
    }
  }

  return { match: matchPart, score: null }
}
