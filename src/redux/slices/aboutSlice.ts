import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AboutStoreType, AboutLocaleType } from '../../types'

const initialState: AboutStoreType = {
  ru: {} as AboutLocaleType,
  ua: {} as AboutLocaleType
}

export const aboutSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAbout(state, action: PayloadAction<AboutStoreType>) {
      state.ru = action.payload.ru
      state.ua = action.payload.ua
    }
  }
})

export const aboutActions = aboutSlice.actions
