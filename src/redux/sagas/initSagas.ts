import { take, all, call, put } from 'redux-saga/effects'
import { getDocs, collection, QuerySnapshot, DocumentData } from 'firebase/firestore'

import { objectCompose, getWeeksIDs } from '../../helpers'
import { db } from '../../db'
import { INIT_APP, SET_ERROR, SET_LOADING } from '../types'
import {
  IAboutContext,
  IAnswersContext,
  IAppContext,
  IUserListContext,
  IWeeksContext,
  SetAboutContextType,
  SetAnswersContextType,
  SetAppContextType,
  SetUserListContextType,
  SetWeeksContextType
} from '../../types'

const season = 2023

const fetchFromDB = async (link: string) => {
  const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, link))
  return objectCompose(response)
}

function* fetchAboutSaga(setAboutContext: SetAboutContextType) {
  try {
    const about: IAboutContext = yield call(fetchFromDB, 'about')
    setAboutContext(about)
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: SET_ERROR,
        payload: error.message
      })
  }
}

function* fetchWeeksSaga(
  appContext: IAppContext,
  setAppContext: SetAppContextType,
  setWeeksContext: SetWeeksContextType
) {
  try {
    const weeks: IWeeksContext = yield call(fetchFromDB, `weeks${season}`)
    const { currentWeek, nextWeek } = getWeeksIDs(weeks)

    setWeeksContext(weeks)
    setAppContext({ ...appContext, currentWeek, nextWeek, season })
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: SET_ERROR,
        payload: error.message
      })
  }
}

function* fetchAnswersSaga(
  setAnswersContext: SetAnswersContextType,
  setCompareContext: SetAnswersContextType
) {
  try {
    const answers: IAnswersContext = yield call(fetchFromDB, `answers${season}`)
    setAnswersContext(answers)
    setCompareContext(structuredClone(answers))
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: SET_ERROR,
        payload: error.message
      })
  }
}

function* fetchUsersSaga(setUserListContext: SetUserListContextType) {
  try {
    const users: IUserListContext = yield call(fetchFromDB, 'users')
    setUserListContext(users)
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: SET_ERROR,
        payload: error.message
      })
  }
}

export function* initSaga() {
  while (true) {
    const { payload } = yield take(INIT_APP)
    const {
      setAboutContext,
      appContext,
      setAppContext,
      setWeeksContext,
      setAnswersContext,
      setCompareContext,
      setUserListContext
    } = payload
    yield all([
      fetchAboutSaga(setAboutContext),
      fetchWeeksSaga(appContext, setAppContext, setWeeksContext),
      fetchAnswersSaga(setAnswersContext, setCompareContext),
      fetchUsersSaga(setUserListContext)
    ])
    yield put({
      type: SET_LOADING,
      payload: false
    })
  }
}
