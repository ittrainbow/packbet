import { OldStandings, Standings, UserStandings } from '@/types'

export function getSeasonStandings(standings: Standings, year: 2022): OldStandings[]
export function getSeasonStandings(standings: Standings, year: number): UserStandings[]
export function getSeasonStandings(standings: Standings, year: number): OldStandings[] | UserStandings[] {
  if (year === 2022) return standings.season2022 ?? []
  return standings[`season${year}`] ?? []
}

export function getWeekStandings(standings: Standings, year: 2022): OldStandings[]
export function getWeekStandings(standings: Standings, year: number): UserStandings[]
export function getWeekStandings(standings: Standings, year: number): OldStandings[] | UserStandings[] {
  if (year === 2022) return standings.season2022 ?? []
  return standings[`week${year}`] ?? []
}
