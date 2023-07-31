import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUserStandings } from '../../types'

const initialState: IUserStandings[] = []

export const standingsSlice = createSlice({
  name: 'standings',
  initialState,
  reducers: {
    setStandings(_, action: PayloadAction<IUserStandings[]>) {
      return action.payload
    }
  }
})

export const standingsActions = standingsSlice.actions
