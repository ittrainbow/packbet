import { Routes, Route } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'
import { useSelector } from 'react-redux'
import { ReactNode } from 'react'

import { Register, Login, Dashboard, UserPage, Profile, Reset } from '../authPages'
import { About, Week, Editor, Standings, WeekList } from '../pages'
import { selectApp } from '../redux/selectors'
import { history } from '../redux/store'
import { Loader } from '../UI'

type RouterProps = {
  children?: ReactNode
}

export const Router = ({ children }: RouterProps) => {
  const { loading } = useSelector(selectApp)

  const routes = () => {
    return (
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/season" element={<WeekList />} />
        <Route path="/calendar" element={<WeekList />} />
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
      {children}
      {loading ? <Loader /> : routes()}
    </HistoryRouter>
  )
}
