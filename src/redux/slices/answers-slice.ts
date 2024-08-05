import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { Answers, AnswersStore } from '../../types'

type AnswersUpdate = {
  answers: Answers
  uid: string
}

type SingleAnswerUpdate = {
  selectedWeek: number
  id: number
  uid: string
  answer: number
}

type SingleAnswerDelete = {
  selectedWeek: number
  id: number
  uid: string
}
const initialState = {} as AnswersStore

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswers(_, action: PayloadAction<AnswersStore>) {
      return action.payload
    },

    updateAnswers(state, action: PayloadAction<AnswersUpdate>) {
      const { answers, uid } = action.payload
      state[uid] = answers
    },

    updateSingleAnswer(state, action: PayloadAction<SingleAnswerUpdate>) {
      const { selectedWeek, uid, id, answer } = action.payload
      if (!state[uid]) state[uid] = {}
      if (!state[uid][selectedWeek]) state[uid][selectedWeek] = {}
      state[uid][selectedWeek][id] = answer
    },

    deleteSingleAnswer(state, action: PayloadAction<SingleAnswerDelete>) {
      const { selectedWeek, uid, id } = action.payload
      const userAnswers = structuredClone(current(state[uid]))
      if (Object.keys(state[uid][selectedWeek]).length === 1) {
        delete userAnswers[selectedWeek]
      } else {
        delete userAnswers[selectedWeek][id]
      }
      state[uid] = userAnswers
    },

    clearAnswers() {
      return initialState
    }
  }
})

export const answersActions = answersSlice.actions
