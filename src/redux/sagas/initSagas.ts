import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs, tableCreator, emailTrim } from '../../helpers'
import { fetchDataFromFirestore } from '../../db'
import { INIT_APP } from '../types'
import {
  IAbout,
  IAnswers,
  IPlayers,
  IUserStandings,
  IWeeksContext,
  SetCompareContextType,
  SetWeeksContextType,
  IUser,
  RawUser
} from '../../types'
import { appActions } from '../slices/appSlice'
import { aboutActions, answersActions, playersActions } from '../slices'
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
  setCompareContext: SetCompareContextType,
) {
  try {
    const weeks: IWeeksContext = yield call(fetchDataFromFirestore, `weeks${season}`)
    setWeeksContext(weeks)

    const answers: IAnswers = yield call(fetchDataFromFirestore, `answers${season}`)
    // yield put(answersActions.setAnswers(answers))
    // setCompareContext(structuredClone(answers))
    
    const players: { [key: string]: RawUser } = yield call(fetchDataFromFirestore, 'users')
    const trimPlayers: { [key: string]: IUser } = yield call(emailTrim, players)
    yield put(playersActions.setPlayers(trimPlayers))
    
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
      setCompareContext,
    } = payload
    yield all([
      fetchAboutSaga(),
      fetchWeeksSaga(setWeeksContext, setCompareContext),
    ])
    yield put(appActions.setLoading(false))
  }
}
