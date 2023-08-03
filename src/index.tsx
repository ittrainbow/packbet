import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import { App } from './App'
import './index.scss'
import { Router } from './router/Router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
