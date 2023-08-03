import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { QuestionsType, WeekType } from '../../types'

const initialState: WeekType = {
  questions: {},
  name: '',
  active: false,
  deadline: new Date().getTime()
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditor(_, action: PayloadAction<WeekType>) {
      return action.payload
    },

    updateEditorQuestions(state, action: PayloadAction<QuestionsType>) {
      state.questions = action.payload
    },

    updateEditorName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },

    updateEditorDeadline(state, action: PayloadAction<number>) {
      state.deadline = action.payload
    },

    updateEditorActive(state, action: PayloadAction<boolean>) {
      state.active = action.payload
    },

    clearEditor() {
      return initialState
    }
  }
})

export const editorActions = editorSlice.actions
