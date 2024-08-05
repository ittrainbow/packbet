import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Standings } from '../../types'

const initialState: Standings = {
  season: [],
  week: []
}

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
