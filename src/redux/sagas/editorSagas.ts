import { call, put, takeEvery } from 'redux-saga/effects'

import { ActionType, WeekUpdateType } from '../../types'
import { SUBMIT_WEEK, DELETE_WEEK } from '../storetypes'
import { writeDocumentToDB, deleteDocumentFromDB } from '../../db'
import { appActions } from '../slices/appSlice'

function* submitWeekSaga(action: ActionType<WeekUpdateType>) {
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

function* deleteWeekSaga(action: ActionType<number>) {
  const weekId = action.payload
  yield put(appActions.setLoading(true))
  try {
    yield call(deleteDocumentFromDB, 'weeks2023', weekId)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

export function* editorSagas() {
  yield takeEvery(SUBMIT_WEEK, submitWeekSaga)
  yield takeEvery(DELETE_WEEK, deleteWeekSaga)
}