import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import { App } from './App'
import { ContextProvider } from './context/Context'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>
)