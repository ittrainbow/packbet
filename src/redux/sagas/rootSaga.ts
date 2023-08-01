import { spawn, call, all } from 'redux-saga/effects'

import { initSaga } from './initSagas'
import { weekSagas } from './weekSagas'
import { userSaga } from './userSagas'

export function* rootSaga() {
  const sagas = [initSaga, weekSagas, userSaga]
  const retrySagas = sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (error) {
          console.error(error)
        }
      }
    })
  })

  yield all(retrySagas)
}
