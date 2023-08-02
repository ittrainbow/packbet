import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

    updateWeeks(state, action: PayloadAction<UpdateWeeksType>) {
      const { week, id } = action.payload
      state[id] = week
    }
  }
})

export const weeksActions = weeksSlice.actions
