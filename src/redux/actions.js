import { SET_MOBILE, SET_LOADING, SET_EDITOR, SET_COMPARE } from './types'

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

export const setEditor = (boolean) => {
  return {
    type: SET_EDITOR,
    payload: boolean
  }
}

export const setCompare = (answers) => {
  return {
    type: SET_COMPARE,
    payload: answers
  }
}