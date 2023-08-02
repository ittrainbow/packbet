import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IWeeks, WeekType } from '../../types'

const initialState = {} as IWeeks

type UpdateWeeksType = {
  week: WeekType
  id: number
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare(_, action: PayloadAction<IWeeks>) {
      return action.payload
    },

    updateCompare(state, action: PayloadAction<UpdateWeeksType>) {
      const { week, id } = action.payload
      state[id] = week
    },
  }
})

export const compareActions = compareSlice.actions
