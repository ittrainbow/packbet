import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ExtendedUser, User } from '@/types'
import { getLocale } from '@/utils'

const initialState: ExtendedUser = {
  name: '',
  locale: getLocale(),
  admin: false,
  buddies: [],
  uid: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { admin, locale, name, adminAsPlayer, buddies } = action.payload
      state.admin = admin
      state.locale = locale
      state.name = name
      state.adminAsPlayer = adminAsPlayer
      state.buddies = buddies
    },

    updateUser(state, action: PayloadAction<{ name: string; locale: User['locale'] }>) {
      const { name, locale } = action.payload
      state.name = name
      state.locale = locale
    },

    setLocale(state, action: PayloadAction<User['locale']>) {
      const { payload } = action
      localStorage.setItem('packContestLocale', payload)
      state.locale = payload
    },

    setAdminAsPlayer(state, action: PayloadAction<boolean>) {
      state.adminAsPlayer = action.payload
    },

    setUid(state, action: PayloadAction<string>) {
      state.uid = action.payload
    },

    setBuddies(state, action: PayloadAction<string[]>) {
      state.buddies = action.payload
    },

    clearUser(_state) {
      return { ...initialState, locale: getLocale() }
    }
  }
})

export const userActions = userSlice.actions
