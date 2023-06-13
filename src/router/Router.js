import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'

import { About, Week, Calendar, Editor, Standings } from '../pages'
import { Register, Login, Dashboard, UserPage, Profile, Reset } from '../authPages'
import { ContextProvider } from '../context/Context'
import { Loader } from '../UI'
import { Header } from '../pages'
import { history } from '../redux/store'

export const Router = ({ children }) => {
  const { loading } = useSelector((store) => store.app)

  const routes = () => {
    return (
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route exact path="/userpage" element={<UserPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/season" element={<Calendar />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/week" element={<Week />}>
          <Route path=":id" element={<Week />} />
        </Route>
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/standings" element={<Standings />} />
        <Route exact path="/editor" element={<Editor />}>
          <Route path=":id" element={<Editor />} />
        </Route>
        <Route exact path="/creator" element={<Editor />} />
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
