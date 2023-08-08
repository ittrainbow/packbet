import { select, put, call } from 'redux-saga/effects'

import { tableCreator } from '../../helpers'
import { getDBCollection } from '../../db'
import { IUserStandings, AnswersType, IStore, IAnswers, IPlayers } from '../../types'
import { standingsActions } from '../slices'

export function* createStandingsSaga(players: IPlayers) {
  const results: AnswersType = yield select((store: IStore) => store.results)
  const answers: IAnswers = yield call(getDBCollection, 'answers')

  const seasonArray: IUserStandings[] = tableCreator({ answers, players, results, fullSeason: true })
  const weekArray: IUserStandings[] = tableCreator({ answers, players, results, fullSeason: false })
  const season = Object.assign({}, seasonArray)
  const week = Object.assign({}, weekArray)

  yield put(standingsActions.setStandings({ season, week }))
}

export function* writeUserToStoreSaga() {
  
}
