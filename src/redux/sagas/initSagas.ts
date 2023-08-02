import { take, all, call, put } from 'redux-saga/effects'

import { getWeeksIDs } from '../../helpers'
import { getCollectionFromDB, getDocumentFromDB } from '../../db'
import { INIT_APP } from '../storetypes'
import {
  IAbout,
  IFetchObject,
  IUserStandings,
  IWeeksContext,
  SetCompareContextType,
  SetWeeksContextType
} from '../../types'
import { appActions } from '../slices/appSlice'
import { aboutActions } from '../slices'
import { standingsActions } from '../slices/standingsSlice'
import { weeksActions } from '../slices/weeksSlice'

const season = 2023

function* fetchAboutSaga() {
  try {
    const about: IAbout = yield call(getCollectionFromDB, 'about')
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
    const weeks: IWeeksContext = yield call(getCollectionFromDB, 'weeks2023')
    // setWeeksContext(weeks)
    yield put(weeksActions.setWeeks(weeks))

    const response: IFetchObject<IUserStandings> = yield call(getDocumentFromDB, 'results2023', 'standings')
    const standings = Object.values(response)

    yield put(standingsActions.setStandings(standings))
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
