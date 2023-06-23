import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'

import { About, Week, Calendar, Editor, Standings } from '../pages'
import { Register, Login, Dashboard, UserPage, Profile, Reset } from '../authPages'
import { Loader } from '../UI'
import { Header } from '../pages'
import { history } from '../redux/store'
import { selectApp } from '../redux/selectors'

type RouterProps = {
  children?: React.ReactNode
}

export const Router = ({ children }: RouterProps) => {
  const { loading } = useSelector(selectApp)

  const routes = () => {
    return (
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/season" element={<Calendar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/week" element={<Week />}>
          <Route path=":id" element={<Week />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/editor" element={<Editor />}>
          <Route path=":id" element={<Editor />} />
        </Route>
        <Route path="/creator" element={<Editor />} />
      </Routes>
    )
  }

  return (
    <HistoryRouter history={history}>
      {/* <ContextProvider> */}
      <Header />
      {children}
      {loading ? <Loader /> : routes()}
      {/* </ContextProvider> */}
    </HistoryRouter>
  )
}
