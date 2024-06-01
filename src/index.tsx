import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './app'
import { store } from './redux/store'
import { Router } from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
