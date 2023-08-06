import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType, ResultsUpdateType } from '../../types'

const initialState = {} as AnswersType

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(_, action: PayloadAction<AnswersType>) {
      return action.payload
    },

    updateResults(state, action: PayloadAction<ResultsUpdateType>) {
      const { results, selectedWeek } = action.payload
      state[selectedWeek] = results[selectedWeek]
    }
  }
})

export const resultsActions = resultsSlice.actions
