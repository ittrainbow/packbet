import { take, all, call, put } from 'redux-saga/effects'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../db'
import { objectCompose, getWeeksIDs } from '../../helpers'

import { INIT_APP, SET_ERROR, SET_LOADING } from '../types'

const season = 2023

const fetchFromDB = async (link) => {
  return getDocs(collection(db, link)).then((response) => {
    return objectCompose(response)
  })
}

function* fetchAboutSaga({ setAboutContext }) {
  try {
    const about = yield call(fetchFromDB, 'about')
    setAboutContext(about)
  } catch (error) {
    yield put({
      type: SET_ERROR,
      payload: error.message
    })
  }
}

function* fetchWeeksSaga({ appContext, setAppContext, setWeeksContext }) {
  try {
    const weeks = yield call(fetchFromDB, `weeks${season}`)
    const { currentWeek, nextWeek } = getWeeksIDs(weeks)

    setWeeksContext(weeks)
    setAppContext({ ...appContext, currentWeek, nextWeek, season })
  } catch (error) {
    yield put({
      type: SET_ERROR,
      payload: error.message
    })
  }
}

function* fetchAnswersSaga({ setAnswersContext, setCompareContext }) {
  try {
    const answers = yield call(fetchFromDB, `answers${season}`)
    setAnswersContext(answers)
    setCompareContext(structuredClone(answers))
  } catch (error) {
    yield put({
      type: SET_ERROR,
      payload: error.message
    })
  }
}

function* fetchUsersSaga({ setUserListContext }) {
  try {
    const users = yield call(fetchFromDB, 'users')
    setUserListContext(users)
  } catch (error) {
    yield put({
      type: SET_ERROR,
      payload: error.message
    })
  }
}

export function* initSaga() {
  while (true) {
    const { payload } = yield take(INIT_APP)
    yield all([
      fetchWeeksSaga(payload),
      fetchAboutSaga(payload),
      fetchAnswersSaga(payload),
      fetchUsersSaga(payload)
    ])
    yield put({
      type: SET_LOADING,
      payload: false
    })
  }
}
