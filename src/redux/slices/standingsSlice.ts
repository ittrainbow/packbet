import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUserStandings } from '../../types'

type StandingsType = {
  season: IUserStandings[]
  week: IUserStandings[]
}

const initialState: StandingsType = {
  season: [],
  week: []
}

export const standingsSlice = createSlice({
  name: 'standings',
  initialState,
  reducers: {
    setStandings(_, action: PayloadAction<StandingsType>) {
      return action.payload
    }
  }
})

export const standingsActions = standingsSlice.actions
