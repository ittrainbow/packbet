import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Standings } from '../../types'

const initialState: Standings = {
  season2022: [],
  week2022: [],
  week2023: [],
  season2023: [],
  week2024: [],
  season2024: []
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
