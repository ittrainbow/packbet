import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer as reducer } from './redux/rootReducer'
import './index.scss'
import App from './App'

const store = configureStore({
  reducer
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <App className="container" />
    {/* </React.StrictMode> */}
  </Provider>
)
