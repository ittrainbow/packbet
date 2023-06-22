import { spawn, call, all } from 'redux-saga/effects'

import { switchEditorSaga } from './appSagas'
import { initSaga } from './initSagas'

export function* rootSaga() {
  const sagas = [switchEditorSaga, initSaga]
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
