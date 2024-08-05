import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { Week, Weeks } from '../../types'

const initialState = {} as Weeks

type UpdateWeeksType = {
  week: Week
  id: number
}

export const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    setWeeks(_, action: PayloadAction<Weeks>) {
      return action.payload
    },

    deleteWeek(state, action: PayloadAction<number>) {
      const weeks = structuredClone(current(state))
      delete weeks[action.payload]
      return weeks
    },

    updateWeeks(state, action: PayloadAction<UpdateWeeksType>) {
      const { week, id } = action.payload
      state[id] = week
    }
  }
})

export const weeksActions = weeksSlice.actions
