import { call, takeEvery } from 'redux-saga/effects'

import { ActionType, WeekDeleteType, WeekSubmitType, WeekUpdateType } from '../../types'
import { SET_WEEK, DELETE_WEEK, SUBMIT_WEEK } from '../types'
import { deleteWeekFromFirestore, setWeekToFirestore, submitWeekToFirestore } from '../../db'
import { setLoading, setError } from './generators'

function* setWeekSaga(action: ActionType<WeekUpdateType>) {
  const { payload } = action
  yield setLoading(true)
  try {
    yield call(setWeekToFirestore, payload)
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
  yield setLoading(false)
}

function* deleteWeekSaga(action: ActionType<WeekDeleteType>) {
  const { payload } = action
  yield setLoading(true)

  try {
    yield call(deleteWeekFromFirestore, payload)
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
  yield setLoading(false)
}

function* submitWeekSaga(action: ActionType<WeekSubmitType>) {
  const { payload } = action
  yield setLoading(true)

  try {
    yield call(submitWeekToFirestore, payload)
  } catch (error) {
    if (error instanceof Error) yield setError(error)
  }
  yield setLoading(false)
}

export function* weekSagas() {
  yield takeEvery(SET_WEEK, setWeekSaga)
  yield takeEvery(DELETE_WEEK, deleteWeekSaga)
  yield takeEvery(SUBMIT_WEEK, submitWeekSaga)
}
