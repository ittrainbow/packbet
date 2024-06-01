import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IStandings } from '../../types'

const initialState: IStandings = {
  season: [],
  week: []
}

export const standingsSlice = createSlice({
  name: 'standings',
  initialState,
  reducers: {
    setStandings(_, action: PayloadAction<IStandings>) {
      return action.payload
    }
  }
})

export const standingsActions = standingsSlice.actions
