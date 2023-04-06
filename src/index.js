import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// import { rootReducer as reducer } from './redux/rootReducer'
import { store } from './redux/store'
import './index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App className="container" />
  </Provider>
)
