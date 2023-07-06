import { put } from 'redux-saga/effects'

import { SET_ERROR, SET_LOADING } from '../types'

export function* setLoading(bool: boolean) {
  yield put({
    type: SET_LOADING,
    payload: bool
  })
}

export function* setLoadingTrue() {
  yield put({
    type: SET_LOADING,
    payload: true
  })
}

export function* setLoadingFalse() {
  yield put({
    type: SET_LOADING,
    payload: false
  })
}

export function* setError(error: Error) {
  yield put({
    type: SET_ERROR,
    payload: error.message
  })
}
