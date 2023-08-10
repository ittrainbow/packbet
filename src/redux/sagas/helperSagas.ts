import { select, put, call } from 'redux-saga/effects'

import { IUserStandings, AnswersType, IStore, IAnswers, IPlayers } from '../../types'
import { standingsActions } from '../slices'
import { getDBCollection } from '../../db'
import { getTable } from '../../helpers'

export function* createStandingsSaga(players: IPlayers) {
  const results: AnswersType = yield select((store: IStore) => store.results)
  const answers: IAnswers = yield call(getDBCollection, 'answers')

  const seasonArray: IUserStandings[] = getTable({ answers, players, results, fullSeason: true })
  const weekArray: IUserStandings[] = getTable({ answers, players, results, fullSeason: false })
  const season = Object.assign({}, seasonArray)
  const week = Object.assign({}, weekArray)

  yield put(standingsActions.setStandings({ season, week }))
}

export function* writeUserToStoreSaga() {
  
}
