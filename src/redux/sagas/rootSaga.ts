import { spawn, call, all } from 'redux-saga/effects'

import { switchEditorSaga } from './appSagas'
import { initSaga } from './initSagas'
import { weekSagas } from './weekSagas'
import { userSaga } from './userSaga'

export function* rootSaga() {
  const sagas = [switchEditorSaga, initSaga, weekSagas, userSaga]
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
