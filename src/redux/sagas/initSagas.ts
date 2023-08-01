import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs, tableCreator } from '../../helpers'
import { fetchDataFromFirestore } from '../../db'
import { INIT_APP } from '../types'
import {
  IAbout,
  IAnswersContext,
  IPlayers,
  IUserStandings,
  IWeeksContext,
  SetAnswersContextType,
  SetWeeksContextType
} from '../../types'
import { appActions } from '../slices/appSlice'
import { aboutActions, playersActions } from '../slices'
import { standingsActions } from '../slices/standingsSlice'

const season = 2023

function* fetchAboutSaga() {
  try {
    const about: IAbout = yield call(fetchDataFromFirestore, 'about')
    yield put(aboutActions.setAbout(about))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchWeeksSaga(
  setWeeksContext: SetWeeksContextType,
  setAnswersContext: SetAnswersContextType,
  setCompareContext: SetAnswersContextType,
) {
  try {
    const weeks: IWeeksContext = yield call(fetchDataFromFirestore, `weeks${season}`)
    setWeeksContext(weeks)

    const answers: IAnswersContext = yield call(fetchDataFromFirestore, `answers${season}`)
    setAnswersContext(answers)
    setCompareContext(structuredClone(answers))

    const players: IPlayers = yield call(fetchDataFromFirestore, 'users')
    yield put(playersActions.setPlayers(players))

    const standings: IUserStandings[] = tableCreator(answers, players)
    yield put(standingsActions.setStandings(standings))

    yield put(appActions.setSeason(season))
    yield put(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* initSaga() {
  while (true) {
    const { payload } = yield take(INIT_APP)
    yield put(appActions.setLoading(true))
    const {
      setWeeksContext,
      setAnswersContext,
      setCompareContext,
    } = payload
    yield all([
      fetchAboutSaga(),
      fetchWeeksSaga(setWeeksContext, setAnswersContext, setCompareContext),
    ])
    yield put(appActions.setLoading(false))
  }
}
