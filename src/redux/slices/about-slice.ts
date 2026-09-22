import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { About } from '@/types'

const initialState: About = {
  ru: {},
  ua: {},
  by: {}
}

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAbout(state, action: PayloadAction<About>) {
      const { ru, ua, by } = action.payload
      state.ru = ru
      state.ua = ua
      state.by = by
    }
  }
})

export const aboutActions = aboutSlice.actions
