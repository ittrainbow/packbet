import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType } from '../../types'

const initialState = {} as AnswersType

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(_, action: PayloadAction<AnswersType>) {
      return action.payload
    }
  }
})

export const resultsActions = resultsSlice.actions
