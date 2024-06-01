import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

import { IWeeks, WeekType } from '../../types'

const initialState = {} as IWeeks

type UpdateWeeksType = {
  week: WeekType
  id: number
}

export const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    setWeeks(_, action: PayloadAction<IWeeks>) {
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
