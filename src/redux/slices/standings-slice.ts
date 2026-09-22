import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CURRENT_SEASON } from '@/config'
import { Standings } from '@/types'

function buildInitialStandings(): Standings {
  const state: Standings = { season2022: [] }
  for (let year = 2023; year <= CURRENT_SEASON; year++) {
    state[`season${year}`] = []
    state[`week${year}`] = []
  }
  return state
}

const initialState: Standings = buildInitialStandings()

export const standingsSlice = createSlice({
  name: 'standings',
  initialState,
  reducers: {
    setStandings(_, action: PayloadAction<Standings>) {
      return action.payload
    }
  }
})

export const standingsActions = standingsSlice.actions
