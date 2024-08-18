import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'

import {
  About,
  Dashboard,
  EditorPage,
  Login,
  Profile,
  Register,
  Reset,
  StandingsPage,
  UserPage,
  WeekList,
  WeekPage
} from '../pages'
import { selectApp } from '../redux/selectors'
import { history } from '../redux/store'
import { Loader } from '../ui'

type Props = {
  children?: ReactNode
}

export const Router = ({ children }: Props) => {
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
        <Route path="/week" element={<WeekPage />}>
          <Route path=":id" element={<WeekPage />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/editor" element={<EditorPage />}>
          <Route path=":id" element={<EditorPage />} />
        </Route>
        <Route path="/creator" element={<EditorPage />} />
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
