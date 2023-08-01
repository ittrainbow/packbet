import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../types'

const initialState: IUser = {
  admin: false,
  locale: 'ru',
  name: '',
  adminAsPlayer: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const { admin, locale, name, adminAsPlayer } = action.payload
      state.admin = admin
      state.locale = locale
      state.name = name
      state.adminAsPlayer = adminAsPlayer
    },

    updateUser(state, action: PayloadAction<{ [key: string]: string }>) {
      state.name = action.payload.name
      state.locale = action.payload.locale
    },

    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload
    },

    setAdminAsPlayer(state, action: PayloadAction<boolean>) {
      state.adminAsPlayer = action.payload
    }
  }
})

export const userActions = userSlice.actions
