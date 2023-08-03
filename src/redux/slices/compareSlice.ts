import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType } from '../../types'

const initialState = {} as CompareType

type CompareType = {
  [key: string]: AnswersType
}

type UpdateCompareType = {
  data: AnswersType
  id: string
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare(_, action: PayloadAction<CompareType>) {
      return action.payload
    },

    updateCompare(state, action: PayloadAction<UpdateCompareType>) {
      const { data, id } = action.payload
      state[id] = data
    },

    clearCompare() {
      return initialState
    }
  }
})

export const compareActions = compareSlice.actions
