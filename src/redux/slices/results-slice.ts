import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { Answers } from '../../types'

const initialState = {} as Answers

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(_, action: PayloadAction<Answers>) {
      return action.payload
    },

    updateResults(
      state,
      action: PayloadAction<{
        results: Answers
        selectedWeek: number
      }>
    ) {
      const { results, selectedWeek } = action.payload
      if (results) {
        state[selectedWeek] = results[selectedWeek]
        return
      }
      return initialState
    },

    updateSingleResult(
      state,
      action: PayloadAction<{
        selectedWeek: number
        id: number
        uid: string
        answer: number
      }>
    ) {
      const { selectedWeek, id, answer } = action.payload
      if (!state[selectedWeek]) state[selectedWeek] = {}
      state[selectedWeek][id] = answer
    },

    deleteSingleResult(
      state,
      action: PayloadAction<{
        selectedWeek: number
        id: number
        uid: string
      }>
    ) {
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
