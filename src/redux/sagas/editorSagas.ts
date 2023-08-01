import { call, put, takeEvery } from 'redux-saga/effects'

import { ActionType, WeekDeleteType, WeekUpdateType } from '../../types'
import { SET_WEEK, DELETE_WEEK } from '../types'
import { deleteWeekFromDB, writeDocumentToDB } from '../../db'
import { appActions } from '../slices/appSlice'

function* setWeekSaga(action: ActionType<WeekUpdateType>) {
  const { payload } = action
  const { id, editorContext } = payload
  yield put(appActions.setLoading(true))
  try {
    yield call(writeDocumentToDB, 'weeks2023', id, editorContext)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

function* deleteWeekSaga(action: ActionType<WeekDeleteType>) {
  const { payload } = action
  yield put(appActions.setLoading(true))

  try {
    yield call(deleteWeekFromDB, payload)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

export function* editorSagas() {
  yield takeEvery(SET_WEEK, setWeekSaga)
  yield takeEvery(DELETE_WEEK, deleteWeekSaga)
}
