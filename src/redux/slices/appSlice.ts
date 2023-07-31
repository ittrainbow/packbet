import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IApp } from '../../types'

const initialState: IApp = {
  mobile: false,
  loading: true,
  editor: false,
  error: '',
  currentWeek: 0,
  emptyEditor: false,
  isItYou: true,
  nextWeek: 0,
  otherUserName: '',
  otherUserUID: '',
  season: 2023,
  selectedWeek: 0,
  tabActive: 1
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },

    setMobile(state, action: PayloadAction<boolean>) {
      state.mobile = action.payload
    },

    setEditor(state, action: PayloadAction<boolean>) {
      state.editor = action.payload
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },

    setCurrentWeek(state, action: PayloadAction<number>) {
      state.currentWeek = action.payload
    },

    setEmptyEditor(state, action: PayloadAction<boolean>) {
      state.emptyEditor = action.payload
    },

    setIsItYou(state, action: PayloadAction<boolean>) {
      state.isItYou = action.payload
    },

    setNextWeek(state, action: PayloadAction<number>) {
      state.nextWeek = action.payload
    },

    setOtherUserName(state, action: PayloadAction<string>) {
      state.otherUserName = action.payload
    },

    setOtherUserUID(state, action: PayloadAction<string>) {
      state.otherUserUID = action.payload
    },

    setSeason(state, action: PayloadAction<number>) {
      state.season = action.payload
    },

    setSelectedWeek(state, action: PayloadAction<number>) {
      state.selectedWeek = action.payload
    },

    setNextAndCurrentWeeks(state, action: PayloadAction<{ [key: string]: number }>) {
      state.nextWeek = action.payload.nextWeek
      state.currentWeek = action.payload.currentWeek
    },

    setTabActive(state, action: PayloadAction<number>) {
      state.tabActive = action.payload
      localStorage.setItem('contestTabActive', action.payload.toString())
    },

    setHeader(state, action: PayloadAction<{ id: number, selectedWeek: number, emptyEditor: boolean }>) {
      state.tabActive = action.payload.id
      state.selectedWeek = action.payload.selectedWeek
      state.emptyEditor = action.payload.emptyEditor
      localStorage.setItem('contestTabActive', action.payload.toString())
    },
  }
})

export const appActions = appSlice.actions