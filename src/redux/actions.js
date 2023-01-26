import { SET_MOBILE, SET_LOADING } from './types'

export const setMobile = (boolean) => {
  return {
    type: SET_MOBILE,
    payload: boolean
  }
}

export const setLoading = (boolean) => {
  return {
    type: SET_LOADING,
    payload: boolean
  }
}