import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tools } from '../../types'

const initialState: Tools = {
  showTools: false,
  showBuddies: localStorage.getItem('packContestFavList') === 'true',
  showOneWeek: localStorage.getItem('packContestOneWeek') === 'true',
  standingsSearch: ''
}

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    switchShowTools(state) {
      const newTools = !state.showTools
      if (newTools === false) state.standingsSearch = ''
      state.showTools = newTools
    },

    setShowTools(state, action: PayloadAction<boolean>) {
      state.showTools = action.payload
    },

    switchShowBuddies(state) {
      state.showBuddies = !state.showBuddies
    },

    switchShowOneWeek(state) {
      state.showOneWeek = !state.showOneWeek
    },

    setSearch(state, action: PayloadAction<string>) {
      state.standingsSearch = action.payload
    },

    clearSearch(state) {
      state.standingsSearch = ''
    }
  }
})

export const toolsActions = toolsSlice.actions
