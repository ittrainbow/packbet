import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType, IAnswers, ResultsUpdateType } from '../../types'

const initialState = {} as AnswersType

export const resultsSlice = createSlice({
  name: 'resuults',
  initialState,
  reducers: {
    setResults(_, action: PayloadAction<AnswersType>) {
      return action.payload
    },

    updateResults(state, action: PayloadAction<ResultsUpdateType>) {
      // const { results, uid } = action.payload
      // const newState = { ...state }
      // newState[uid] = results
      // return newState
    }
  }
})

export const resultsActions = resultsSlice.actions
