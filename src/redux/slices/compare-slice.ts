import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Answers } from '../../types'

const initialState = {} as CompareType

type CompareType = {
  [key: string]: Answers
}

type UpdateCompareType = {
  data: Answers
  id: string
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setCompare(_, action: PayloadAction<CompareType>) {
      const answers = action.payload.answers || {}
      const results = action.payload.results || {}
      return { answers, results }
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
