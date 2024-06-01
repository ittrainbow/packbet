import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType } from '../../types'

type ResultsUpdateType = {
  results: AnswersType
  selectedWeek: number
}

type SingleResultUpdateType = {
  selectedWeek: number
  id: number
  uid: string
  answer: number
}

type SingleResultDeleteType = {
  selectedWeek: number
  id: number
  uid: string
}

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
      if (results) {
        state[selectedWeek] = results[selectedWeek]
      } else {
        return initialState
      }
    },

    updateSingleResult(state, action: PayloadAction<SingleResultUpdateType>) {
      const { selectedWeek, id, answer } = action.payload
      if (!state[selectedWeek]) state[selectedWeek] = {}
      state[selectedWeek][id] = answer
    },

    deleteSingleResult(state, action: PayloadAction<SingleResultDeleteType>) {
      const { selectedWeek, id } = action.payload
      const newState = structuredClone(current(state))
      if (Object.keys(state[selectedWeek]).length === 1) {
        delete newState[selectedWeek]
      } else {
        delete newState[selectedWeek][id]
      }
      return newState
    }
  }
})

export const resultsActions = resultsSlice.actions
